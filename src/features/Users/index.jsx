import { Alert, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { crearUsuarios, editarUsuarios, obtenerUsuario, obtenerUsuarioAutenticado } from '../../services/api/users/users';
import { useAuth } from '../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';
import { guardarSession } from '../../services/session/Session';
import { encriptarJson } from '../../helpers/Encriptado';
import { activarMembresia, cancelarMembresia } from '../../services/api/memberships/memberships';

export default function Form(props) {
  let navigate = useNavigate();

  const { mostrarLoader, mostrarNotificacion, usuario, cargarUsuario } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [status, setStatus] = useState("cancelada")
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)

  React.useEffect(() => {
    obtenerAuth()
  }, [])
  const obtenerAuth = async () => {
    const data = await obtenerUsuario(usuario.token)
    if (data.status == 200) {
      if (data.data.subscriptions.length > 0) {
        setStatus(data.data.subscriptions[0].status)
        setName(data.plan.name)
        setPrice(data.plan.price)
      }else{
        setStatus("cancelada")
        setName("")
        setPrice(0)
      }
    }
  }
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: 'onChange', defaultValues: usuario.user
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownToken = (event) => {
    event.preventDefault();
  };
  const entrar = async (dt) => {
    mostrarLoader(true)
    let data;
    data = await editarUsuarios(dt, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data)
    if (data.status == 200) {
      let usuarioTemp = usuario;
      usuarioTemp = { token: usuarioTemp.token, user: { ...usuarioTemp.user, names: dt.names, last_names: dt.last_names, email: dt.email } }
      let encrypt = encriptarJson(JSON.stringify(usuarioTemp))
      cargarUsuario(encrypt)
      guardarSession(encrypt);
      window.location.href = "/usuarios"
    }
  }
  const breadcrumbs = [
    <Link underline="none" key="1" color="inherit"  >
      SISTEMA
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/usuarios"
    >
      Administración
    </Link>,
    <Typography key="3" color="text.primary">
      Editar cuenta
    </Typography>,
  ];
  const cancelarSubscripcion = async () => {
    if (status == "activa") {
      let a = confirm("¿Está seguro de terminar su subscripción?")
      if (!a) return
      mostrarLoader(true)
      const data = await cancelarMembresia(usuario.token)
      mostrarNotificacion(data)
      mostrarLoader(false)
      if (data.status == 200) {
        obtenerAuth();
      }
    } else {
      let a = confirm("Para activar su subscripción debe pagar una membresía")
      if (!a) return
 
      navigate('/membresias')
  
    }

  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Grid>

      <Grid item xs={12}>
        <Alert severity="info" action={
          <Button color="inherit" size="small" onClick={cancelarSubscripcion}>
            {status == "activa" ? "Cancelar" : "Suscribirse"}
          </Button>
        }>Subscripción {status}: <span style={{ fontWeight: 'bold' }}>{name} (${price}/mo)</span></Alert>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Nombres"
          error={Boolean(errors.names)}
          {...register("names", {
            required: "Required",
          })}
          sx={{ width: '100%' }}
          name="names"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Apellidos"
          error={Boolean(errors.last_names)}
          {...register("last_names", {
            required: "Required",
          })}
          sx={{ width: '100%' }}
          name="last_names"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Correo electrónico"
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
          <InputLabel htmlFor="outlined-adornment-password">Token Open AI</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showToken ? 'text' : 'password'}
            error={Boolean(errors.token_ai)}
            name="open_ai_token"
            {...register("open_ai_token", {
              required: false,
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowToken(!showToken)}
                  onMouseDown={handleMouseDownToken}
                  edge="end"
                >
                  {showToken ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }

            label="Token Open AI"
          />
        </FormControl>
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
              required: false,
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
          Guardar
        </Button>

      </Grid>
    </Grid>
  )
}
