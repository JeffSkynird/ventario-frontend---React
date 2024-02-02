import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Button, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import fondo from '../../assets/images/background3.jpg'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth'
import { iniciarSesion } from '../../services/api/auth/login';
import { guardarSession } from '../../services/session/Session';
import { encriptarJson } from '../../helpers/Encriptado';
import { useNavigate } from 'react-router-dom';
import books from '../../assets/lottie/case4.json';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Lottie from "lottie-react";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Box } from '@mui/system';
export default function Login() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  let navigate = useNavigate();
  const [alignment, setAlignment] = useState('miembros');
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: 'onChange'
  });
  useEffect(() => {
    if (usuario != null) {
      navigate("/")
    }
  }
    , [usuario])

  const entrar = async (dt) => {
    mostrarLoader(true)
    let obj = {
      email: dt.email, password: dt.password
    }
    const tiempoEspera = 1000;
    setTimeout(async () => {
      const data = await iniciarSesion(obj)
      mostrarLoader(false)
      mostrarNotificacion(data)
      if (data.status == 200) {
        let encrypt = encriptarJson(JSON.stringify({ user: data.user, token: data.token }))
        cargarUsuario(encrypt)
        guardarSession(encrypt);
      }
  
    }, tiempoEspera);
   
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Grid container sx={{ height: '100vh', backgroundSize: 'cover' }}>
      <Grid item xs={0} md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ borderBottomRightRadius: 25, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2699fb' }}>
          {/*           <Lottie animationData={books} style={{ height: '85vh' }} />
 */}
          <Typography variant="h2" style={{ fontWeight: 'bold', color: 'white', letterSpacing: 18 }}>Ventario</Typography>

          <div style={{ position: 'absolute', bottom: 10, }}>
            <Typography style={{ color: 'white', textAlign: 'center' }} color="initial">Copyright 0 2023 by VENTARIO</Typography>
            <Typography style={{ color: 'white', textAlign: 'center' }} color="initial">
              All rights reserved</Typography>
          </div>
        </Box>


      </Grid>
      <Grid item xs={12} md={5} sx={{ backgroundColor: '#ceeaff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} >
          <Grid item xs={12}>

            <Typography variant="h3" sx={{ textAlign: 'center', color: '#2699fb' }}>
              Iniciar Sesión
            </Typography>
            {/*      <Typography variant="body1" sx={{ textAlign: 'center' }}>
Acceso exclusivo con membresía
</Typography> */}
          </Grid>
          <Grid item xs={12} >
            <Paper style={{ padding: 50, marginRight: '20%', marginLeft: '20%', }}>

              <Grid container spacing={2} >
                {/*  <Grid item xs={12}>
              <Alert severity="info">Si no tienes cuenta registrate desde aquí eligiendo un plan</Alert>

            </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Nombre de Usuario"
                    error={Boolean(errors.email)}
                    {...register("email", {
                      required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      error={Boolean(errors.password)}
                      name="password"
                      {...register("password", {
                        required: "Required",
                      })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          entrar()
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }

                      label="Contraseña"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={handleSubmit(entrar)}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Ingresar
                  </Button>

                </Grid>
                <Grid item xs={12}>
                  <Button
                    //onClick={handleSubmit(entrar)}
                    fullWidth
                    variant="flat"
                    color="primary"
                  >
                    Recuperar contraseña
                  </Button>
                </Grid>
              </Grid>

            </Paper>
          </Grid>

        </Grid>

      </Grid>




    </Grid>
  )
}
