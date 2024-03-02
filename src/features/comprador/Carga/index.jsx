import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import Button from '@mui/material/Button'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Alert, Box, Breadcrumbs, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Skeleton, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { subirArchivo } from '../../../services/api/products/products';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Modal from './components/Modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [fileUpload, setFileUpload] = useState(null);
  const [carga, setCarga] = useState(false);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  React.useEffect(() => {
    // obtenerLista()
  }, [])
  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data1 = await subirArchivo(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
    obtenerLista()
  }
  const style = {
    container: {
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      height: '180px',
      overflowY: 'auto'
    },
    imageContainer: {
      color: '#fff',
      padding: '20px',
      borderRadius: '5px'
    },
    detailsContainer: {
      marginLeft: '10px'
    },
    title: {
      fontSize: '18px'
    }
  };
  const handleCapture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileUpload(file)
      setCarga(true)
    }
    
  };
  const upload = async () => {
    if(fileUpload == null){
      mostrarNotificacion({ type: 'error', message: 'Seleccione un archivo' })
      return
    }
    mostrarLoader(true)
    const data1 = await subirArchivo(fileUpload, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion({ type: data1.status, message: data1.message })
   
  }
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography >Carga de inventario</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Paper style={{ padding: 20, width: '100%' }}>

                <Typography style={{ fontWeight: 'bold', marginBottom: 10 }}>Cargar inventario</Typography>


                {
                  carga == true && (
                    <Alert>Archivo cargado</Alert>
                  )
                }
                {
                  carga == false && (
                    <Button style={{ marginTop: 10, borderRadius: 9 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                      Cargar archivo
                      <input style={{ visibility: 'hidden', whiteSpace: 'nowrap', width: 0, overflow: 'hidden', }} onChange={handleCapture} type="file" name="" id="" />


                    </Button>
                  )
                }

                {
                  carga == true && (
                    <Button color="secondary" style={{ marginTop: 10, borderRadius: 9 }} component="label" variant="contained" onClick={upload}>
                      Subir Archivo
                    </Button>
                  )
                }

              </Paper>

            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>
  )
}

