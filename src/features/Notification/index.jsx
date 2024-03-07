import { Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../../hooks/useAuth';
import { eliminarNotificaciones, obtenerTodosPorUsuario } from '../../services/api/notificaciones/notificaciones';
export default function index() {
    const { usuario, mostrarLoader, mostrarNotificacion,pulso,enviarPulso } = useAuth();
    const [notificationData, setNotificationData] = React.useState([])
    useEffect(() => {
        if(pulso){
            enviarPulso(false);
        }
        async function fetchNotificaciones() {
            const data = await obtenerTodosPorUsuario(usuario.user.id, usuario.token)
            setNotificationData(data)
        }
        fetchNotificaciones()
    }
        , [])
    const eliminarNot = async () => {
        if (confirm("¿Está seguro de eliminar las notificaciones") == true) {
            mostrarLoader(true)
            const data = await eliminarNotificaciones(usuario.user.id, usuario.token)
            mostrarLoader(false)
            mostrarNotificacion({ type: data.status, message: data.message })
            if (data.status == "success") {
                setNotificationData([])
            }
        }
    }
    return (
        <Grid container spacing={2} >
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Notificaciones</Typography>
                <IconButton aria-label="delete" onClick={eliminarNot}>
                    <DeleteOutlineIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <List>
                    {
                        notificationData.map((item, index) => (
                            <ListItem disablePadding key={index}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <NotificationsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} secondary={item.message} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid >
    )
}
