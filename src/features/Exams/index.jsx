import React, { Fragment, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Paper, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Modal from './components/ModalOferta'
import ModalVisita from './components/ModalVisita'
import ModalMensaje from './components/ModalMensaje'
import { useLocation } from 'react-router-dom';
import Detail from './components/Detail'
export default function index(props) {
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  let { id } = useParams();

  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const breadcrumbs = [
    <Link
      underline="none"
      key="2"
      color="inherit"

    >
      Administración
    </Link>,
    <Typography key="3" color="text.primary">
      Visualizar (Generación)
    </Typography>,
  ];
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
  return (
    <div>
      <Modal isEdited={state?.isEdited} open={open} setOpen={setOpen} />
      <ModalVisita isEdited={state?.isEdited} open={open2} setOpen={setOpen2} />
      <ModalMensaje open={open3} setOpen={setOpen3} />

      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography color="initial">Buscador / Nombre del producto</Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ padding: 20, marginRight: '5%', width: '100%' }}>
            <Grid container  >
              <Grid item xs={10} style={{ display: 'flex', gap: 30, justifyContent: 'center', }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <img style={{ height: '50px', width: '50px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                  <img style={{ height: '50px', width: '50px' }} src="https://m.media-amazon.com/images/I/710M8zAJK8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                  <img style={{ height: '50px', width: '50px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                  <img style={{ height: '50px', width: '50px' }} src="https://m.media-amazon.com/images/I/710M8zAJK8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                </div>
                <div>
                  <img style={{ height: '200px', width: '200px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                </div>
                <div  >
                  <b>Nombre del producto</b><br />
                  <span>4.8 ★★★★☆ (36)</span><br />
                  <span >Cantidad disponible: 10</span><br />
                  <span>Venta mínima de compra: $1000</span><br />
                  <span style={{ opacity: 0.8 }}>Comuna: Aríca</span><br />
                  <span style={{ opacity: 0.8 }}>Region: Tarapacá</span><br />
                  <span style={{ opacity: 0.8 }}>Tipo de producto: Uno</span><br />
                </div>
                <div style={{ width: 360 }}>
                  <b>Descripción adicional</b><br />
                  <span>Lorem ipsum dolor sit amet consectetur adipiscing elit mus, massa convallis ac hendrerit malesuada non primis, laoreet aliquet et feugiat senectus accumsan conubia. Quis sem felis vivamus torquent auctor pulvinar pretium luctus eu risus tristique, fringilla facilisis curabitur natoque gravida vulputate primis feugiat dictumst</span>
                </div>
              </Grid>
              <Grid item xs={2} style={{ display: 'flex', gap: 10, flexDirection: 'column', justifyContent: 'center' }}>
                <Button
                  onClick={() => setOpen(true)}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {state?.isEdited && ("Editar oferta")}
                  {!state?.isEdited && ("Haga una oferta")}

                </Button>
                <Button
                  onClick={() => setOpen2(true)}

                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {state?.isEdited && ("Editar visita")}
                  {!state?.isEdited && (" Programe una visita")}
                </Button>
                <Button
                  style={{ display: state?.isEdited ? "none" : "inline" }}
                  onClick={() => setOpen3(true)}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Enviar un mensaje
                </Button>
                <Typography style={{ display: state?.isEdited ? "none" : "inline" }}
                  variant="caption" color="initial">(Pregunta sobre el producto o pide documentos/fotos aquí</Typography>
              </Grid>
            </Grid>

          </Paper>

        </Grid>

        {!state?.isEdited && (
          <>
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Typography color="initial">Otros productos de la misma empresa</Typography>

            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                  <div style={style.container} onClick={() => navigate('/generation/' + 1)}>
                    <div style={{ display: 'flex' }}>
                      <div style={style.imageContainer}>
                        <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                      </div>
                      <div style={style.detailsContainer}>
                        <b style={style.title}>Nombre del producto</b><br />
                        <span>4.8 ★★★★☆ (36)</span><br />
                        <span>Arica Tarapacá</span><br />
                        <span>Tipo Uno</span><br />
                        <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                        <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                      </div>
                    </div>

                  </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={style.container}>
                    <div style={{ display: 'flex' }}>
                      <div style={style.imageContainer}>
                        <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/710M8zAJK8L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                      </div>
                      <div style={style.detailsContainer}>
                        <b style={style.title}>Nombre del producto</b><br />
                        <span>4.8 ★★★★☆ (36)</span><br />
                        <span>Arica Tarapacá</span><br />
                        <span>Tipo Uno</span><br />
                        <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                        <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                      </div>
                    </div>

                  </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={style.container}>
                    <div style={{ display: 'flex' }}>
                      <div style={style.imageContainer}>
                        <img style={{ height: '100px', width: '100px' }} src="https://m.media-amazon.com/images/I/81x9-laqL0L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                      </div>
                      <div style={style.detailsContainer}>
                        <b style={style.title}>Nombre del producto</b><br />
                        <span>4.8 ★★★★☆ (36)</span><br />
                        <span>Arica Tarapacá</span><br />
                        <span>Tipo Uno</span><br />
                        <span style={{ opacity: 0.8 }}>3.000 unidades</span><br />
                        <span style={{ opacity: 0.8 }}>Venta mínima de 1000 unidades</span><br />
                      </div>
                    </div>

                  </div>
                </Grid>

              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Typography ><IconButton style={{ display: page > 1 ? 'inline' : 'none' }} onClick={() => setPage(page - 1)}>
                  <ArrowLeftIcon />
                </IconButton>  Página {page} de 2  <IconButton style={{ display: page < 2 ? 'inline' : 'none' }} onClick={() => setPage(page + 1)}>
                    <ArrowRightIcon />
                  </IconButton> </Typography>

              </Grid>

            </Grid></>
        )}
        {state?.isEdited && (
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Detail />

          </Grid>
        )}
      </Grid>
    </div>
  )
}

