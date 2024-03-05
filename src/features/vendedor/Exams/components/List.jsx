import { Box, Grid, Skeleton } from '@mui/material';
import { ChatController, MuiChat } from 'chat-ui-react';
import React from 'react'
import { useAuth } from '../../../hooks/useAuth';
import { obtenerResultados } from '../../../services/api/generations/generations';

export default function List(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
    const [chatCtl] = React.useState(new ChatController());
    const [datos, setDatos] = React.useState([]);
    const [fini, setFini] = React.useState(false);
    React.useMemo(async () => {
        if(usuario){

            const data = await obtenerResultados(props.generation_id,usuario.token)
            data.data.map((item) => {
                chatCtl.addMessage({
                    type: 'text',
                    content: item.command,
                    self: true,
                });
                chatCtl.addMessage({
                    type: 'text',
                    content: item.result,
                    self: false,

                });
            })
            setFini(true)
        }
      }, [chatCtl]);
      
    return (
        <Grid container>
            <Grid item xs={12} id="chatContainer" >
                <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
                <MuiChat key="1" id="1" chatController={chatCtl} x  /> 
                    {
                        fini==false ?    <Skeleton height={100} />:   null
                     
                    }
                </Box>
            </Grid>
        </Grid>

    )
}
