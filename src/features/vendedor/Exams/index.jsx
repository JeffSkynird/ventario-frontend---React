import React, { Fragment, useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Pagination, Paper, Skeleton, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Modal from './components/ModalOferta'
import ModalVisita from './components/ModalVisita'
import ModalMensaje from './components/ModalMensaje'
import { useLocation } from 'react-router-dom';
import Detail from './components/Detail'
import { useTheme } from '@emotion/react';
import { obtenerTodosVendedorPagina } from '../../../services/api/products/products';
import { obtenerPorId } from '../../../services/api/processes/processes';
export default function index(props) {
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  let { id } = useParams();

  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [productInfo, setProductInfo] = useState(null);
  const [productObj, setProductObj] = useState(null)
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
  const [productsRelated, setProductsRelated] = useState([])
  useEffect(() => {
    console.log("AQUI")
    console.log(state)
    if (state) {
      if (state.isNew) {
        if (state.item.images != null) {
          console.log(state)
          setActiveImage(state.item.images[0].url)
          setImage2(state.item.images[1].url)
          setImage3(state.item.images[2].url)
          setImage4(state.item.images[3].url)
          setImage5(state?.item.images[4]?.url)

        } else if (state.item.image) {
          setActiveImage(state.item.image)

          setImage2(state.item.image2)
          setImage3(state.item.image3)
          setImage4(state.item.image4)
          setImage5(state.item.image5)
          searchRelatedProducts(1)
        }else {
          setActiveImage(state.item?.boxes[0]?.images[0]?.url)
          
          setImage2(state.item?.boxes[0]?.images[1]?.url)
          setImage3(state.item?.boxes[0]?.images[2]?.url)
          setImage4(state.item?.boxes[0]?.images[3]?.url)
          setImage5(state.item?.boxes[0]?.images[4]?.url)
        }
        setProductInfo(state.item)
        setProductObj(state.item)
      } else {
        refreshSearch();
      }
    }else {
      refreshSearch();
    }
  }, [state])

  const refreshSearch = async () => {
    const dat = await obtenerPorId(id, usuario.token);
    setActiveImage(dat[0]?.box?.boxImages[0]?.url)
    setImage2(dat[0]?.box?.boxImages[1]?.url)
    setImage3(dat[0]?.box?.boxImages[2]?.url)
    setImage4(dat[0]?.box?.boxImages[3]?.url)
    setImage5(dat[0]?.box?.boxImages[4]?.url)
    setProductInfo(dat[0])
    setProductObj(dat[0]?.box?.product)
  }

  const searchRelatedProducts = async (pageValue) => {
    if(state.item.vendedorId){
      const data = await obtenerTodosVendedorPagina(usuario.token, { vendorId: state.item.vendedorId, current: state.item.id }, pageValue)
      console.log(data)
      setProductsRelated(data)
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    searchRelatedProducts(newValue)
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
  console.log(productInfo)
  console.log("SEXO")
  console.log(state)
  return (
    <div>

      <Grid container spacing={2} >
      {
        productInfo != null && (
          <>
            <Modal isEdited={!state?.isNew} open={open} setOpen={setOpen} item={productInfo} refresh={refreshSearch} />
            <ModalVisita isEdited={!state?.isNew} open={open2} setOpen={setOpen2} item={productInfo} refresh={refreshSearch} />
            <ModalMensaje open={open3} setOpen={setOpen3} item={productInfo} />

          </>
        )
      }
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 'bold' }}>Buscador / {productObj?.name}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ padding: 20, marginRight: '5%', width: '100%' }}>
            <Grid container  >
              <Grid item xs={12} md={10} style={{ display: matches ? 'block' : 'flex', gap: 30, justifyContent: 'center', }}>
                <div style={{ display: 'flex', flexDirection: matches ? 'row' : 'column', gap: 10 }}>
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
                  <b>{productObj?.name}</b><br />
                  <span>{productObj?.averageGrade} ★★★★☆ (36)</span><br />
                  <span >Cantidad disponible: {productObj?.totalUnits}</span><br />
                  <span>Venta mínima de compra: ${productObj?.minimumSale}</span><br />
                  <span style={{ opacity: 0.8 }}>Comuna: Aríca</span><br />
                  <span style={{ opacity: 0.8 }}>Region: Tarapacá</span><br />
                  <span style={{ opacity: 0.8 }}>Tipo de producto: Uno</span><br />
                </div>
                <div style={{ width: matches ? 'auto' : 360 }}>
                  <b>Descripción adicional</b><br />
                  <span>{productObj?.description}</span>
                </div>
              </Grid>
              <Grid item xs={12} md={2} style={{ display: matches ? 'block' : 'flex', gap: 10, flexDirection: 'column', justifyContent: 'center' }}>
                <Button
                  onClick={() => setOpen(true)}
                  fullWidth
                  sx={{ borderRadius: 9 }}
                  variant="contained"
                  color="primary"
                >
                  {!state?.isNew && ("Editar oferta")}
                  {state?.isNew && ("Haga una oferta")}

                </Button>
                <Button
                  onClick={() => setOpen2(true)}
                  sx={{ borderRadius: 9 }}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {!state?.isNew && ("Editar visita")}
                  {state?.isNew && (" Programe una visita")}
                </Button>
                <Button
                  style={{ display: !state?.isNew ? "none" : "inline" }}
                  sx={{ borderRadius: 9 }}
                  onClick={() => setOpen3(true)}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Enviar un mensaje
                </Button>
                <Typography style={{ display: !state?.isNew ? "none" : "inline" }}
                  variant="caption" >Pregunta sobre el producto o pide documentos/fotos aquí</Typography>
              </Grid>
            </Grid>

          </Paper>

        </Grid>

        {state?.isNew && productsRelated.length!=0 && (
          <div style={{ padding: 10, marginTop: 10 }}>

            <Grid item xs={12} style={{ marginTop: 20, marginBottom: 10 }}>
              <Typography style={{ fontWeight: 'bold' }}>Otros productos de la misma empresa</Typography>

            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {
                  productsRelated?.data?.map((item, index) => (
                    <Grid item xs={12} md={4}>
                      <div style={style.container} onClick={() => {
                        navigate('/buscador/' + item.id, { state: {item,isNew:true} })
                      }}>
                        <div style={{ display: 'flex' }}>
                          <div style={style.imageContainer}>
                            <img style={{ height: '100px', width: '100px' }} src={item?.boxes[0]?.images[0]?.url} alt="" />
                          </div>
                          <div style={style.detailsContainer}>
                            <b style={style.title}>{item.name}</b><br />
                            <span>{item.averageGrade} ★★★★☆ (36)</span><br />
                            <span >Arica Tarapacá</span><br />
                            <span>Tipo Uno</span><br />
                            <span style={{ opacity: 0.8 }}>{item.totalUnits} unidades</span><br />
                            <span style={{ opacity: 0.8 }}>Venta mínima de {item.minimumSale} unidades</span><br />
                          </div>
                        </div>

                      </div>
                    </Grid>
                  ))
                }
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }} >
                <Pagination count={productsRelated?.totalPages} page={page} onChange={handleChange} />

              </Grid>

            </Grid>
          </div>
        )}
        {(!state?.isNew && productInfo != null) && (
          <Grid item xs={12} >
            <Detail item={productInfo} token={usuario.token} processID={id} userId={usuario.user.id} />

          </Grid>
        )}
      </Grid>
    </div>
  )
}

