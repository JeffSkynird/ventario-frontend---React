import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import Button from '@mui/material/Button'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material';
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
import { crear, eliminar, eliminarPorGeneracion, obtenerTodos as obtenerTags } from '../../../services/api/tags/tags';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token, selectedTag], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [page,setPage] = useState(1);

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
      height:'180px',
      overflowY:'auto'
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
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography color="initial">Buscador</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="Buscador"
                sx={{ width: '100%' }}
                name="Buscador"
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Región</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Región"}
                >
                  <MenuItem value={""}>Selecciona una región</MenuItem>
                  <MenuItem value={1}>Región de Arica y Parinacota	</MenuItem>
                  <MenuItem value={2}>Región de Tarapacá</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Comuna</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Comuna"}
                >
                  <MenuItem value={""}>Selecciona una comuna</MenuItem>
                  <MenuItem value={1}>Arica</MenuItem>
                  <MenuItem value={2}>Camarones</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Tipo de producto</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Tipo de producto"}
                >
                  <MenuItem value={""}>Selecciona un tipo</MenuItem>
                  <MenuItem value={1}>Uno</MenuItem>
                  <MenuItem value={2}>Dos</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Industria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Industria"}
                >
                  <MenuItem value={""}>Selecciona una industria</MenuItem>
                  <MenuItem value={1}>Una</MenuItem>
                  <MenuItem value={2}>Dos</MenuItem>

                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} >
          {isLoading && (
            <Grid container spacing={1}>
              <Grid item xs={4}>

                <Skeleton height={100} />
              </Grid>
              <Grid item xs={4}>

                <Skeleton height={100} />
              </Grid>
              <Grid item xs={4}>

                <Skeleton height={100} />
              </Grid>
            </Grid>
          )}
          {!isLoading && (
            <Grid container spacing={1}>
              <Grid item xs={6} md={4}>
                <div style={style.container} onClick={()=>navigate('/generation/'+1)}>
                  <div style={{ display: 'flex' }}>
                    <div style={style.imageContainer}>
                      <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                    </div>
                    <div style={style.detailsContainer}>
                      <b style={style.title}>Nombre del producto</b><br />
                      <span>4.8 ★★★★☆ (36)</span><br />
                      <span >Arica Tarapacá</span><br />
                      <span>Tipo Uno</span><br />
                      <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                      <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                    </div>
                  </div>

                </div>
              </Grid>
              <Grid item xs={6} md={4}>
              <div style={style.container} onClick={()=>navigate('/generation/'+1)}>
                  <div style={{ display: 'flex' }}>
                    <div style={style.imageContainer}>
                      <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/710M8zAJK8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                    </div>
                    <div style={style.detailsContainer}>
                      <b style={style.title}>Nombre del producto</b><br />
                      <span>4.8 ★★★★☆ (36)</span><br />
                      <span >Arica Tarapacá</span><br />
                      <span>Tipo Uno</span><br />
                      <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                      <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                    </div>
                  </div>

                </div>
              </Grid>
              <Grid item xs={6} md={4}>
              <div style={style.container} onClick={()=>navigate('/generation/'+1)}>
                  <div style={{ display: 'flex' }}>
                    <div style={style.imageContainer}>
                      <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                    </div>
                    <div style={style.detailsContainer}>
                      <b style={style.title}>Nombre del producto</b><br />
                      <span>4.8 ★★★★☆ (36)</span><br />
                      <span >Arica Tarapacá</span><br />
                      <span>Tipo Uno</span><br />
                      <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                      <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                    </div>
                  </div>

                </div>
              </Grid>
              <Grid item xs={6} md={4}>
              <div style={style.container} onClick={()=>navigate('/generation/'+1)}>
                  <div style={{ display: 'flex' }}>
                    <div style={style.imageContainer}>
                      <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/710M8zAJK8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                    </div>
                    <div style={style.detailsContainer}>
                      <b style={style.title}>Nombre del producto</b><br />
                      <span>4.8 ★★★★☆ (36)</span><br />
                      <span >Arica Tarapacá</span><br />
                      <span>Tipo Uno</span><br />
                      <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                      <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                    </div>
                  </div>

                </div>
              </Grid>
              <Grid item xs={6} md={4}>
              <div style={style.container} onClick={()=>navigate('/generation/'+1)}>
                  <div style={{ display: 'flex' }}>
                    <div style={style.imageContainer}>
                      <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                    </div>
                    <div style={style.detailsContainer}>
                      <b style={style.title}>Nombre del producto</b><br />
                      <span>4.8 ★★★★☆ (36)</span><br />
                      <span >Arica Tarapacá</span><br />
                      <span>Tipo Uno</span><br />
                      <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                      <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                    </div>
                  </div>

                </div>
              </Grid>
              <Grid item xs={6} md={4}>
              <div style={style.container} onClick={()=>navigate('/generation/'+1)}>
                  <div style={{ display: 'flex' }}>
                    <div style={style.imageContainer}>
                      <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/710M8zAJK8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                    </div>
                    <div style={style.detailsContainer}>
                      <b style={style.title}>Nombre del producto</b><br />
                      <span>4.8 ★★★★☆ (36)</span><br />
                      <span >Arica Tarapacá</span><br />
                      <span>Tipo Uno</span><br />
                      <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                      <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                    </div>
                  </div>

                </div>
              </Grid>
            </Grid>

          )}
          <Grid item xs={12} style={{display:'flex',justifyContent:'center',marginTop:10}}>
            <Typography ><IconButton style={{display:page>1?'inline':'none'}}  onClick={()=>setPage(page-1)}  >
              <ArrowLeftIcon />
            </IconButton>  Página {page} de 2  <IconButton style={{display:page<2?'inline':'none'}}  onClick={()=>setPage(page+1)}  >
              <ArrowRightIcon />
            </IconButton> </Typography>

          </Grid>

        </Grid>
      </Grid>
    </div>
  )
}

