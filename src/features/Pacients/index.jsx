import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { eliminarUsuario } from '../../services/api/users/users'
import { useAuth } from '../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../components/table/Table'
import { Box, Breadcrumbs, Grid, IconButton, Skeleton, Typography, Button, Chip } from '@mui/material';
import Link from '@mui/material/Link';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { eliminar, obtenerTodos } from '../../services/api/pacients/pacients';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import './style.css';
import { obtenerResultado, obtenerResumen, obtenerResumenPorId } from '../../services/api/resume/resume';
export default function index() {
  const [chatCtl, setChatCtl] = React.useState(new ChatController());
  const [hasReset, setHasReset] = React.useState(false);
  const [lastGenerationId, setLastGenerationId] = React.useState(0);
  const [end, setEnd] = React.useState(false);
  const navigate = useNavigate()



  let a = React.useMemo(async () => {
    await chatCtl.addMessage({
      type: 'text',
      content: `¿Qué te gustaría resumir?`,
      self: false,
    });

    const mulSel = await chatCtl.setActionRequest({
      type: 'select',
      style: { width: '100px' },
      options: [
        {
          value: '1',
          text: 'Texto',
        },
        {
          value: '2',
          text: 'Pdf',
        },
        {
          value: '3',
          text: 'Imagen',
        },
        {
          value: '4',
          text: 'Audio',
        },
        {
          value: '5',
          text: 'Video',
        },
        {
          value: '6',
          text: 'Youtube',
        },
      ],
    });
    console.log(mulSel.option.value)
    let prompt = "";
    let file = null;
    if (mulSel.option.value == '1') {
      await chatCtl.addMessage({
        type: 'text',
        content: `Ingresa el texto a resumir`,
        self: false,
      });
      prompt = await chatCtl.setActionRequest({ type: 'text' });
    } else {
      await chatCtl.addMessage({
        type: 'text',
        content: `Ingresa el archivo a resumir`,
        self: false,
      });
      file = (await chatCtl.setActionRequest({
        type: 'file',
        multiple: true,
      }))
    }

    await chatCtl.addMessage({
      type: 'text',
      content: `Pregunta lo que desees`,
      self: false,

    });
    const name3 = await chatCtl.setActionRequest({ type: 'text' });
    let obj = {
      generation_type_id: mulSel.option.value,
      prompt:prompt?.value,
      command: name3.value,
      file:file?.files[0]
    }
    makePetition(obj);
  }, [chatCtl]);
  const { mostrarNotificacion, mostrarLoader, usuario } = useAuth();
  const obtenerMensajes = () => {
    console.log(chatCtl.getMessages())
  }
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      SISTEMA
    </Link>,
    <Link
      underline="none"
      key="2"
      color="inherit"

    >
      Administración
    </Link>,
    <Typography key="3" color="text.primary">
      Resumir
    </Typography>,
  ];
  const resetUseMemo = async () => {
    chatCtl.clearMessages();
    await chatCtl.addMessage({
      type: 'text',
      content: `Pregunta lo que desees`,
      self: false,

    });
    const name3 = await chatCtl.setActionRequest({ type: 'text' });

    obtenerOtroResumen(name3.value);
  }
  const resetUseMemo2 = () => {
    navigate(0)
  }
  const makePetition = async (obj) => {
    if(obj.prompt==null||obj.prompt==undefined){
      obj.prompt="Archivo";
    }
    try{
      const data = await obtenerResumen(obj,usuario.token);
      if(data.type=="success"){
        await chatCtl.addMessage({
          type: 'text',
          content: data.result,
          self: false,
        });
         obtenerRespuestaPeriodica(data.generation_id)
         setLastGenerationId(data.generation_id)
      }else{
        if(data.hasOwnProperty('result')){
          await chatCtl.addMessage({
            type: 'text',
            content: data.result,
            self: false,
          });
        }else{
          await chatCtl.addMessage({
            type: 'text',
            content: 'Ocurrió un error inesperado',
            self: false,
          });
        }
      }
    } catch (error) {
      await chatCtl.addMessage({
        type: 'text',
        content: 'Ocurrió un error inesperado',
        self: false,
      });
    }
   
  }
  const obtenerRespuestaPeriodica= async (id)=>{
    const token = usuario.token;
    let count = 0;
    const interval = setInterval(async () => {  
      try{
        if(count == 4){
          clearInterval(interval);
        }
        const data = await obtenerResultado(id,token);
        if(data.status=="200"){
          if(data.data.status=="finalizado"){
            clearInterval(interval);
            chatCtl.removeMessage(chatCtl.getMessages().length-1);
            await chatCtl.addMessage({
              type: 'text',
              content: data.data.result,
              self: false,
            });
            setEnd(true)
          }
        }else if(data.status=="500"){
          clearInterval(interval);
          await chatCtl.addMessage({
            type: 'text',
            content: 'Ocurrió un error inesperado',
            self: false,
          });
        }
        count++;
      } catch (error) {
        clearInterval(interval);
        await chatCtl.addMessage({
          type: 'text',
          content: 'Ocurrió un error inesperado',
          self: false,
        });
      }
    }, 5000);


  }
  const obtenerOtroResumen = async (command) => {
    let obj = {
      id: lastGenerationId,
      command
    }
    const data = await obtenerResumenPorId(obj, usuario.token)
    if (data.type == "success") {
      await chatCtl.addMessage({
        type: 'text',
        content: data.result,
        self: false,
      });
      obtenerRespuestaPeriodica(lastGenerationId)
    } else {
      if (data.hasOwnProperty('result')) {
        await chatCtl.addMessage({
          type: 'text',
          content: data.result,
          self: false,
        });
      } else {
        await chatCtl.addMessage({
          type: 'text',
          content: 'Ocurrió un error inesperado',
          self: false,
        });
      }
    }
  }
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          {end && (<Chip label="Haz otra pregunta" onClick={resetUseMemo} sx={{ marginRight: '5px' }} />)}
          {end && (<Chip label="Resume otra cosa" onClick={resetUseMemo2} />)}

        </Grid>
        <Grid item xs={12} id="chatContainer" >
          <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
            {

              chatCtl != null ? <MuiChat key="1" id="1" chatController={chatCtl} x /> : null

            }
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

