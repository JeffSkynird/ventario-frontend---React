import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Button, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
//import fondo from '../../assets/images/background3.jpg'
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
import fondo from '../../assets/images/background-ventario.png'
import logo from '../../assets/images/logo.png'
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';
export default function Login() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  let navigate = useNavigate();
  const [alignment, setAlignment] = useState('miembros');
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: 'onChange'
  });
  useEffect(() => {
    if (usuario != null) {
      if (usuario.user.type == "Comprador") {
        navigate("/")
      } else if (usuario.user.type == "Vendedor") {
        navigate("/activos")
      } else if (usuario.user.type == "Admin") {
        navigate('/datos')
      }
    }
  }
    , [usuario])

  const entrar = async (dt) => {
    mostrarLoader(true)
    try {
      let obj = {
        email: dt.email, password: dt.password
      }
      const data = await iniciarSesion(obj)
      mostrarLoader(false)
      mostrarNotificacion({ type: data.status, message: data.message })
      if (data.status == "success") {
        let encrypt = encriptarJson(JSON.stringify({ user: { companyId: data.data.user.companyId, names: data.data.user.name, email: data.data.user.email, avatar: data.data.user.avatar, id: data.data.user.id, type: data.data.user.rol.rol }, token: data.data.token }))
        cargarUsuario(encrypt)
        guardarSession(encrypt);
      }
    } catch (e) {
      console.log(e)
      mostrarLoader(false)
      mostrarNotificacion({ type: e.response.data.status, message: e.response.data.message })
    }
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Grid container sx={{ height: '100vh', backgroundSize: 'cover' }}>
      <Grid item xs={0} md={7} sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: '#00050d' }}>
        <Box sx={{ borderBottomRightRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${fondo})`, height: '100vh', backgroundSize: 'cover' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="" style={{ width: '60%', height: '30%' }} />
          </Box>

          <div style={{ position: 'absolute', bottom: 10, }}>
            <Typography style={{ color: 'white', textAlign: 'center' }} color="initial">Copyright © 2023 by VENTARIO</Typography>
            <Typography style={{ color: 'white', textAlign: 'center' }} color="initial">
              All rights reserved</Typography>
          </div>
        </Box>


      </Grid>
      <Grid item xs={12} md={5} sx={{ backgroundColor: theme.palette.mode != "dark" ? '#F2F7F2' : 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12} >
            <Paper sx={{ marginRight: { lg: '20%', md: '10%', sm: '10%', xs: '2%' }, marginLeft: { lg: '20%', md: '10%', sm: "10%", xs: '2%' }, }}>
              <Box sx={{ backgroundColor: '#076B00', borderTopLeftRadius: 3, borderTopRightRadius: 3, padding: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', color: '#FFF' }}>
                  Iniciar Sesión
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ padding: 5 }}>
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
                    sx={{ borderRadius: 9 }}
                    variant="contained"
                    color="primary"
                  >
                    Ingresar
                  </Button>

                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={()=>navigate('/recover_pass')}
                    fullWidth
                    variant="text"
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
