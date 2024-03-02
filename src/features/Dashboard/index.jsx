import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import Button from '@mui/material/Button'
import { useAuth } from '../../hooks/useAuth';
import { cerrarSesion } from '../../services/api/auth/login';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../components/table/Table'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Lottie from "lottie-react";

import { Alert, Avatar, Box, Breadcrumbs, Card, CardContent, Chip, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import noValue from '../../assets/noValue.svg'
import BarVertical from './components/BarVertical'
import PieChart from './components/PieChart'
import { useEffect } from 'react';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import { obtenerKpis, obtenerUltimas } from '../../services/api/generations/generations';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import emptyLottie from '../../assets/lottie/empty.json'


export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [data, setData] = useState([])
  const [kpis, setKpis] = useState({ finalizadas: 0, pendientes: 0 })
  const navigate = useNavigate();

  useEffect(() => {
    const fetching = async () => {
      if (usuario != null) {
        const dataR = await obtenerUltimas(usuario.token)
        const kpisR = await obtenerKpis(usuario.token)
        setData(dataR.data)
        setKpis(kpisR.data)
      }
    }
    fetching()
  }, [])


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
      Usuarios
    </Typography>,
  ];
  return (
    <div>
      <Grid container spacing={2}>

        <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" >
            Dashboard
          </Typography>

        </Grid>

        <Grid item xs={12} md={12} >
          <Grid container spacing={2}>

            <Grid item xs={12} md={4}>
              <Card style={{ position: 'relative', width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#5e35b1', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#733FDC', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => {
                      navigate('/datos/' + 1, { state: { title: "Cierre de negocios" } })
                    }
                    } >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ color: 'black', marginTop: 5, backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {/*kpis != null ? kpis.pacients : 0*/}
                    12
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Lista de cierre de negocios
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ position: 'relative', width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#1e88e5', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#43A7FF', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => {
                      navigate('/datos/' + 2, { state: { title: "Ofertas no respondidas por el vendedor" } })
                    }
                    } >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ color: 'black', marginTop: 5, backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {
                      kpis != null ? kpis.finalizadas : 0
                    }
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Lista de ofertas no respondidas por el vendedor
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ position: 'relative', width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#4DB48D', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#64E0B1', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => {
                      navigate('/datos/' + 3, { state: { title: "Rechazos por no responder en 5 días" } })
                    }
                    } >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ marginTop: 5, color: 'black', backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {
                      kpis != null ? kpis.pendientes : 0
                    }
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Lista de rechazos por no responder en 5 días
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ position: 'relative', width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#5e35b1', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#733FDC', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit"  onClick={() => {
                      navigate('/datos/' + 4, { state: { title: "Rechazos por precio no correcto" } })
                    }
                    }  >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ marginTop: 5, color: 'black', backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {
                      kpis != null ? kpis.pendientes : 0
                    }
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Lista de rechazos por precio no correcto
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ position: 'relative', width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#1e88e5', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#43A7FF', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => {
                      navigate('/datos/' + 5, { state: { title: "Ofertas post visitas no cerrados" } })
                    }
                    }  >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ marginTop: 5, color: 'black', backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {
                      kpis != null ? kpis.pendientes : 0
                    }
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Lista de ofertas post visitas no cerrados
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card style={{ position: 'relative', width: '100%', height: 150, marginRight: 20, marginBottom: 5, backgroundColor: '#4DB48D', borderRadius: 12 }}>
                <CardContent>
                  <Avatar variant="rounded" style={{ zIndex: 1, height: 30, width: 30, position: 'absolute', top: 15, right: 10, backgroundColor: '#64E0B1', borderRadius: 5, marginBottom: 15 }} >
                    <IconButton aria-label="show 4 new mails" color="inherit"  onClick={() => {
                      navigate('/datos/' + 6, { state: { title: "Después de visita" } })
                    }
                    }  >

                      <MoreHorizOutlinedIcon fontSize="small" />
                    </IconButton>

                  </Avatar>
                  <Avatar variant="rounded" style={{ marginTop: 5, color: 'black', backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} >

                    <InsertChartOutlinedIcon />

                  </Avatar>


                  <Typography variant="h4" style={{ color: 'white', fontSize: '2.125rem' }} >
                    {
                      kpis != null ? kpis.pendientes : 0
                    }
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: 'white' }} gutterBottom>
                    Lista después de visita
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} >
              <Typography variant="body1" style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                Historial accesos por comprador (no incluye oferta/visita) <Chip label={data.length} />
              </Typography>

            </Grid>
            {
              data.length == 0 && (
                <Grid item xs={12} md={12} >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Lottie animationData={emptyLottie} loop={true} style={{ height: 250 }} />

                  </div>
                </Grid>
              )
            }
            {
              data.length > 0 && (
                <Grid item xs={12} md={12} >
                  <List>
                    {
                      data.map((item, index) => (
                        <ListItem disablePadding secondaryAction={
                          <IconButton edge="end" aria-label="delete" >
                            {item.status == "pendiente" ? <RotateLeftOutlinedIcon /> : <CheckCircleOutlineOutlinedIcon />}
                          </IconButton>
                        }>
                          <ListItemButton onClick={() => navigate('/buscador/' + item.id)}>
                            <ListItemIcon>
                              <Avatar>{index + 1}</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={item.status + " - " + item.generation_type?.name} secondary={item.created_at} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    }
                  </List>

                </Grid>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

