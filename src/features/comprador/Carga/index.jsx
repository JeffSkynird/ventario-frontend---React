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
import { obtenerPdf, obtenerPorTag, obtenerTodos } from '../../../services/api/generations/generations';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Modal from './components/Modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import { crear, eliminar, eliminarPorGeneracion, obtenerTodos as obtenerTags } from '../../../services/api/tags/tags';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token, selectedTag], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1);
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
    const data1 = await eliminar(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
    obtenerLista()
  }
  async function obtenerLista() {
    const data1 = await obtenerTags(usuario.token)
    setTags(data1.data)
  }

  const handleDelete = async (id) => {
    mostrarLoader(true)
    const data1 = await eliminarPorGeneracion(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
    refetch()
  }

  const columns = [
    {
      Header: 'Tag',
      accessor: 'tag',
      Cell: ({ row }) => (row.original.tag != null ? <Chip label={row.original.tag.name} onDelete={() => handleDelete(row.original.id)} color="primary" variant="outlined" /> : null)
    },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: ({ row }) => (<Chip label={row.original.status} color="primary" />
      )
    },
    {
      Header: 'Iniciado en',
      accessor: 'created_at',
    },
    {
      Header: 'Finalizado en',
      accessor: 'updated_at',
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{ display: 'flex' }}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/generation/' + value.row.original.id)
          }
          }>
            <RemoveRedEyeOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => {

            imprimir(value.row.original.id)
          }

          }>
            <CloudDownloadOutlinedIcon />
          </IconButton>


        </div>

      )
    },
  ]
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
      Resultados
    </Typography>,
  ];

  const imprimir = async (id) => {
    const dat = await obtenerPdf(id, usuario.token);
    const url = window.URL.createObjectURL(new Blob([dat]));
    let a = document.createElement('a');
    a.href = url;
    a.download = 'generacion.pdf';
    a.click();
  }

  const filtrarPorTag = async (id) => {
    setSelectedTag(id)
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
 const handleCapture = ({ target }) => {
    setCarga(true)
    mostrarNotificacion({ type: "success", message: 'Archivo cargado con éxito' })

  };
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography color="initial">Carga de inventario</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Paper style={{ padding: 20, width: '100%' }}>

                <Typography style={{fontWeight:'bold',marginBottom:10}}>Cargar inventario</Typography>


                {
                  carga == true && (
                    <Alert>Archivo cargado</Alert>
                  )
                }
                {
                  carga == false && (
                    <Button style={{ marginTop: 10, borderRadius: 9 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                      Subir archivo
                      <input style={{visibility:'hidden',whiteSpace:'nowrap',width:0,    overflow: 'hidden',}}  onChange={handleCapture} type="file" name="" id="" />
                    

                    </Button>
                  )
                }

                {
                  carga == true && (
                    <Button style={{ marginTop: 10, borderRadius: 9 }} component="label" variant="outlined" onClick={()=>setCarga(false)}>
                      Cerrar
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

