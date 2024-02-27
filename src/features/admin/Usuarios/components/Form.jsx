import { Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAuth } from '../../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { crear, editar } from '../../../../services/api/pacients/pacients';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


import { useEffect } from 'react';
export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [borndate, setBorndate] = useState(new Date())
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange', defaultValues: state
    });
    useEffect(() => {
        if (state != null) {
            /*     let parts =state.born_date.split('-');
                if(parts!=null&&parts.length!=0){
                    let mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                    setBorndate(mydate)
                }
               */
        }
    }, [state])
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validacion = (dt) => {
        let errors = false;
        if (!validar(dt.dni)) {
            mostrarNotificacion({ type: "error", message: 'Cédula no válida' })
            errors = true;
        }
        if (!validateEmail(dt.email)) {
            mostrarNotificacion({ type: "error", message: 'Correo no válido' })
            errors = true;
        }
        return errors;
    }

    function validar(cad) {
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10) {
            for (let i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (cad.charAt(longitud - 1) == total) {
                return true;
            } else {
                return false;
            }
        }
    }

    const entrar = async (dt) => {
        console.log(dt)
        dt.born_date = borndate
        if (validacion(dt)) {
            return
        }
        mostrarLoader(true)
        let data;
        if (state) {
            data = await editar(dt, usuario.token)
        } else {
            data = await crear(dt, usuario.token)
        }
        mostrarLoader(false)
        mostrarNotificacion(data)
        if (data.status == 200) {
            window.location.href = "/pacientes"
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
            Usuarios
        </Link>,
        <Typography key="3" color="text.primary">
            {state ? "Editar" : "Crear"}
        </Typography>,
    ];
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
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
                <Button style={{ marginTop: 10, borderRadius: 9 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Subir Avatar
                    <input style={{ visibility: 'hidden', whiteSpace: 'nowrap', width: 0, overflow: 'hidden', }} type="file" name="" id="" />


                </Button>
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
                    label="Usuario"
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
                <TextField
                    variant="outlined"
                    label="Celular"
                    error={Boolean(errors.phone)}
                    {...register("phone", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="phone"
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
                    Guardar
                </Button>

            </Grid>
        </Grid>
    )
}
