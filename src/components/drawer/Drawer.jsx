import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../hooks/useAuth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import leftBackground from '../../assets/images/leftbackground.png';
import logo2 from '../../assets/images/logo-minus.png';
import avatar from '../../assets/images/avatar.png';

import { Badge, Button, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { removeSession } from '../../services/session/Session';
import { cerrarSesion } from '../../services/api/auth/login';
import { useLocation, useNavigate } from 'react-router-dom';
import indicador from '../../assets/indicador.png';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
const drawerWidth = 240;
import drawerLottie from '../../assets/lottie/drawer5.json';
import Lottie from "lottie-react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function ResponsiveDrawer(props) {
  const { mostrarNotificacion, usuario, mostrarLoader, logout, activarOscuro, darkMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (usuario == null) {
    return props.children;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const indicator = (<img src={indicador} alt="" srcSet="" style={{ width: 10, height: 15 }} />)
  const drawer = (
    <div style={{ backgroundColor: '#076001', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', }}>

      <div style={{ backgroundImage: `url(${leftBackground})`, height: '100vh', backgroundSize: 'cover', }}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'space-between', paddingTop: 25 }}>
          <img src={logo2} alt="" style={{ width: 141, height: 47 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10, marginTop: 20 }}>
          {/* <img src={logo} alt="google" width={'80%'}/> */}
          <img src={avatar} alt="" style={{ width: 80 }} />
          {/* <Typography variant='body2'>Bienvenido, <span style={{fontWeight:'bold',color:'#5E35B1'}}>Jefferson</span> </Typography> */}
        </div>
        <List>
          {usuario.user.type == "comprador" && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/post_visita")}>
              <Badge badgeContent={1} color="error"  invisible={!location.pathname.includes("/post_visita")} style={{width:'100%'}}>

                <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/post_visita") ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/post_visita") ? 'white' : 'transparent' }}>

                      <ListItemText primary={"Post visita"} style={{ color: location.pathname.includes("/post_visita") ? '#076B00' : 'white' }} />

                </Box>
                </Badge>

              </ListItemButton>
            </ListItem>
          )}
          {usuario.user.type == "comprador" && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/buscador")}>
                <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/buscador") || location.pathname == "/" ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/buscador") || location.pathname == "/" ? 'white' : 'transparent' }}>
                  <ListItemText primary={"Buscador"} style={{ color: location.pathname.includes("/buscador") || location.pathname == "/" ? '#076B00' : 'white' }} />
                </Box>
              </ListItemButton>
            </ListItem>
          )}
          {usuario.user.type == "comprador" && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/pacientes")}>
                <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/pacientes") ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/pacientes") ? 'white' : 'transparent' }}>
                  <ListItemText primary={"Procesos Activos"} style={{ color: location.pathname.includes("/pacientes") ? '#076B00' : 'white' }} />
                </Box>
              </ListItemButton>
            </ListItem>
          )}
          {usuario.user.type == "comprador" && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/resultados")}>
                <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/resultados") ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/resultados") ? 'white' : 'transparent' }}>
                  <ListItemText primary={"Procesos Cerrados"} style={{ color: location.pathname.includes("/resultados") ? '#076B00' : 'white' }} />
                </Box>
              </ListItemButton>
            </ListItem>
          )}

          {usuario.user.type == "vendedor" && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/activos")}>
                <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/activos") ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/activos") ? 'white' : 'transparent' }}>
                  <ListItemText primary={"Procesos Activados"} style={{ color: location.pathname.includes("/activos") ? '#076B00' : 'white' }} />
                </Box>
              </ListItemButton>

            </ListItem>
          )}
          {usuario.user.type == "vendedor" && (
            <ListItemButton onClick={() => navigate("/cerrados")}>
              <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/cerrados") ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/cerrados") ? 'white' : 'transparent' }}>
                <ListItemText primary={"Procesos Cerrados"} style={{ color: location.pathname.includes("/cerrados") ? '#076B00' : 'white' }} />
              </Box>
            </ListItemButton>
          )}
          {usuario.user.type == "vendedor" && (
            <ListItemButton onClick={() => navigate("/productos")}>
              <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/productos") ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/productos") ? 'white' : 'transparent' }}>
                <ListItemText primary={"Mis Productos"} style={{ color: location.pathname.includes("/productos") ? '#076B00' : 'white' }} />
              </Box>
            </ListItemButton>
          )}
          {usuario.user.type == "vendedor" && (
            <ListItemButton onClick={() => navigate("/carga")}>
              <Box style={{ padding: 5, borderRadius: 9, width: '100%', color: location.pathname.includes("/carga") ? '#2699fb' : 'white', backgroundColor: location.pathname.includes("/carga") ? 'white' : 'transparent' }}>
                <ListItemText primary={"Carga de Inventario"} style={{ color: location.pathname.includes("/carga") ? '#076B00' : 'white' }} />
              </Box>
            </ListItemButton>
          )}
        </List>

      </div>
      <div style={{ position: 'absolute', bottom: 10, left: 15 }}>
        <Typography variant="body2" style={{ opacity: 0.6, color: 'white', textAlign: 'center' }} color="initial">Copyright © 2023 by VENTARIO</Typography>
        <Typography variant="body2" style={{ opacity: 0.6, color: 'white', textAlign: 'center' }} color="initial">
          All rights reserved</Typography>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const cerrar = async () => {
    mostrarLoader(true)
    //const data = await cerrarSesion(usuario.token)
    const tiempoEspera = 1000;
    setTimeout(() => {
      mostrarLoader(false)
      mostrarNotificacion({ type: "success", message: 'Sesión cerrada con éxito' })
      logout()
      removeSession()
      window.location.href = "/login"
    }, tiempoEspera);


  }
  const changeColor = () => {
    activarOscuro(!darkMode)

  }
  console.log(usuario)
  return (
    <Box sx={{
      display: { sm: 'flex' }
    }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="transparent"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <Typography variant="h6" noWrap component="div" color="primary">
              {usuario.user.type == "comprador" ? "COMPRADOR" : "VENDEDOR"}
            </Typography>
            <Typography variant="body2" color="initial" sx={{ color: 'gray' }}>Sistema en desarrollo</Typography>
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

          </Typography>

          <IconButton aria-label="delete" >
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={changeColor}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <IconButton aria-label="delete" onClick={cerrar}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ borderTopLeftRadius: 9, flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
