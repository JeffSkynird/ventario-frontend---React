import React, { Fragment, useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Skeleton, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Modal from './components/ModalOferta'
import ModalVisita from './components/ModalVisita'
import ModalMensaje from './components/ModalMensaje'
import { useLocation } from 'react-router-dom';
import Detail from './components/Detail'
import NumbersIcon from '@mui/icons-material/Numbers';
import { useTheme } from '@emotion/react';

export default function index(props) {
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  let { id } = useParams();

  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [productInfo, setProductInfo] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(null)
  const [image2, setImage2] = React.useState(null)
  const [image3, setImage3] = React.useState(null)
  const [image4, setImage4] = React.useState(null)
  const [image5, setImage5] = React.useState(null)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (state) {
      console.log(state)
      if (state.isNew) {
        if (state.item.images != null) {
          console.log(state)
          setActiveImage(state.item.images[0].url)
          setImage2(state.item.images[1].url)
          setImage3(state.item.images[2].url)
          setImage4(state.item.images[3].url)
          setImage5(state?.item.images[4]?.url)

        } else {
          setActiveImage(state.item.image)

          setImage2(state.item.image2)
          setImage3(state.item.image3)
          setImage4(state.item.image4)
          setImage5(state.item.image5)
        }
        setProductInfo(state.item)
      } else {
        console.log(state.item)

        setActiveImage(state.item?.box?.boxImages[0]?.url)
        setImage2(state.item?.box?.boxImages[1]?.url)
        setImage3(state.item?.box?.boxImages[2]?.url)
        setImage4(state.item?.box?.boxImages[3]?.url)
        setImage5(state.item?.box?.boxImages[4]?.url)
        setProductInfo(state.item?.box?.product)
      }


    }
  }, [])
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
      <Modal isEdited={!state?.isNew} open={open} setOpen={setOpen} item={state.item}/>
      <ModalVisita isEdited={!state?.isNew} open={open2} setOpen={setOpen2} item={state.item}/>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography >Buscador / Nombre del producto</Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ padding: 20, marginRight: '5%', width: '100%' }}>
            <Grid container  >
              <Grid item xs={9} style={{ display: 'flex', gap: 30, justifyContent: 'center', }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <img style={{ height: '50px', width: '50px', objectFit: 'cover', cursor: 'pointer' }} src={image2} alt="" onClick={(e) => {
                    let tempImg = e.target.src
                    setActiveImage(tempImg)
                    setImage2(activeImage)
                  }} />
                  <img style={{ height: '50px', width: '50px', objectFit: 'cover', cursor: 'pointer' }} src={image3} alt="" onClick={(e) => {
                    let tempImg = e.target.src
                    setActiveImage(tempImg)
                    setImage3(activeImage)
                  }} />
                  <img style={{ height: '50px', width: '50px', objectFit: 'cover', cursor: 'pointer' }} src={image4} alt="" onClick={(e) => {
                    let tempImg = e.target.src
                    setActiveImage(tempImg)
                    setImage4(activeImage)
                  }} />
                  <img style={{ height: '50px', width: '50px', objectFit: 'cover', cursor: 'pointer' }} src={image5} alt="" onClick={(e) => {
                    let tempImg = e.target.src
                    setActiveImage(tempImg)
                    setImage5(activeImage)
                  }} />
                </div>
                <div>
                <img style={{ height: '200px', width: '200px' }} src={activeImage} alt="" />
                </div>
                <div  >
                  <b>{productInfo?.name}</b><br />
                  <span>{productInfo?.averageGrade} ★★★★☆ (36)</span><br />
                  <span >Cantidad disponible: {productInfo?.totalUnits}</span><br />
                  <span>Venta mínima de compra: ${productInfo?.minimumSale}</span><br />
                  <span style={{ opacity: 0.8 }}>Comuna: Aríca</span><br />
                  <span style={{ opacity: 0.8 }}>Region: Tarapacá</span><br />
                  <span style={{ opacity: 0.8 }}>Tipo de producto: Uno</span><br />
                </div>
                <div style={{ width: matches ? 'auto' : 360 }}>
                  <b>Descripción adicional</b><br />
                  <span>{productInfo?.description}</span>
                </div>
              </Grid>
              <Grid item xs={3} style={{ display: 'flex', gap: 10, flexDirection: 'column', justifyContent: 'center' }}>
                <Button
                  onClick={() => setOpen(true)}
                  fullWidth
                  sx={{ borderRadius: 9 }}
                  variant="contained"
                  color="primary"
                >
                  Responder oferta
                </Button>
                <Button
                  onClick={() => setOpen2(true)}
                  sx={{ borderRadius: 9 }}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Responder visita
                </Button>
                <List dense={true} sx={{ height: 150, overflowY: 'auto' }} subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Lista de cod emp
                  </ListSubheader>
                }>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <NumbersIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cod emp: 34873843434" />
                    </ListItemButton>

                  </ListItem>
                  <ListItem disablePadding>

                    <ListItemButton>
                      <ListItemIcon>
                        <NumbersIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cod emp: 34873843434" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>

                    <ListItemButton>
                      <ListItemIcon>
                        <NumbersIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cod emp: 34873843434" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>

                    <ListItemButton>
                      <ListItemIcon>
                        <NumbersIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cod emp: 34873843434" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Grid>
            </Grid>

          </Paper>

        </Grid>

        {state?.isNew && (
          <div style={{ backgroundColor: '#b8dca2' }}>
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Typography color="initial">Otssssros productos de la misma empresa</Typography>

            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                  <div style={style.container} onClick={() => navigate('/buscador/' + 1)}>
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

            </Grid>
          </div>
        )}
        {!state?.isNew && (
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Detail item={state.item} token={usuario.token} processID={id} companyId={usuario.user.companyId} userId={usuario.user.id} customerId={state.item.clienteId} />

          </Grid>
        )}
      </Grid>
    </div>
  )
}

