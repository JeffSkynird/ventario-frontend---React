import { Box, Chip, Grid } from '@mui/material'
import React from 'react'
import { useAuth } from '../../../hooks/useAuth';

export default function New(props) {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
 
  return (
    <Grid container>
        <Grid item md={12}>
       
        </Grid>
        <Grid item xs={12} id="chatContainer" >
          <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
       
          </Box>
        </Grid>
    </Grid>


  )
}
