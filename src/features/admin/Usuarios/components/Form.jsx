import { Avatar, Breadcrumbs, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAuth } from '../../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { crear, editar } from '../../../../services/api/users/users';
import { obtenerTodos } from '../../../../services/api/rols/rols';
import { obtenerTodosFiltro as obtenerEmpresas } from '../../../../services/api/empresas/empresas';

import { Visibility, VisibilityOff } from '@mui/icons-material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from '../../../../../firebase'; // Ruta a tu archivo firebase.js

import { useEffect } from 'react';
export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [borndate, setBorndate] = useState(new Date())
    const [image, setImage] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [roles, setRoles] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const { register, handleSubmit, formState: { errors }, setValue, getValues, control } = useForm({
        mode: 'onChange', defaultValues: state
    });
    useEffect(() => {
        if (state) {
            console.log("AQUI")
            console.log(state)
            setImage({ url: state.avatar })
        }
        const funcion = async () => {
            const data = await obtenerTodos(usuario.token)
            const data2 = await obtenerEmpresas(usuario.token)
            setRoles(data.data)
            setEmpresas(data2)
        }
        funcion();
    }, [])
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validacion = (dt) => {
        let errors = false;
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
        if (validacion(dt)) {
            return
        }
        mostrarLoader(true)
        if (image.raw) {
            let url = await handleFileUpload(image.raw, state ? state.avatar : null);
            dt.avatar = url;
        }
        let data;
        if (state) {
            data = await editar(dt, usuario.token)
        } else {
            data = await crear(dt, usuario.token)
        }
        mostrarLoader(false)
        mostrarNotificacion({ type: data.status, message: data.message })
        if (data.status == 'success') {
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
    /*   const handleCapture = (event) => {
          const file = event.target.files[0]; 
          if (file) {
              setValue("avatar", "https://mui.com/static/images/avatar/3.jpg");
          }
      } */
    const handleCapture = (event) => {
        const file = event.target.files[0]
        let newImage;
        if (file) {
            //newImages = [...images, { url: URL.createObjectURL(file) }]
            newImage = { url: URL.createObjectURL(file), raw: file }
        }
        setImage(newImage)
    }

    const handleFileUpload = async (file, currentUrl) => {
        try {
            const storageRef = storage.ref();
            const boxesRef = storageRef.child('/Avatars'); // Ruta de la carpeta "Avatars"

            // Eliminar la imagen actual si existe
            if (currentUrl) {
                try {
                    const imageRef = storage.refFromURL(currentUrl);
                    if (imageRef){
                        await imageRef.delete();
                        console.log("Imagen anterior eliminada exitosamente");
                    }
                } catch (error) {
                    console.error("Error al eliminar la imagen anterior:", error);
                }
            }

            // Subir el nuevo archivo
            const fileRef = boxesRef.child(file.name); // Referencia al archivo en la carpeta "Avatars"
            await fileRef.put(file);
            console.log("Archivo subido exitosamente");

            // Obtener la URL del nuevo archivo guardado
            const url = await fileRef.getDownloadURL();
            console.log("URL del archivo:", url);
            return url;
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            return null;
        }
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button style={{ marginTop: 10, borderRadius: 9 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Subir Avatar
                    <input onChange={handleCapture} style={{ visibility: 'hidden', whiteSpace: 'nowrap', width: 0, overflow: 'hidden', }} type="file" name="" id="" />
                </Button>
                <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={image?.url} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Nombres"
                    error={Boolean(errors.name)}
                    {...register("name", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="name"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="DNI"
                    error={Boolean(errors.dni)}
                    {...register("dni", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="dni"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Usuario"
                    error={Boolean(errors.username)}
                    {...register("username", {
                        required: "Required",
                    })}
                    sx={{ width: '100%' }}
                    name="username"
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
                <FormControl fullWidth error={Boolean(errors.companyId)}>
                    <InputLabel id="level-label">Empresa</InputLabel>
                    <Controller
                        {...register("companyId", {
                            required: "Required",
                        })}
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Empresa"
                                labelId="level-label"
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <MenuItem value="">Selecciona una empresa</MenuItem>
                                {empresas.map((e, index) => (
                                    <MenuItem key={index} value={e.id}>
                                        {e.razonSocial}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>


            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.rolId)}>
                    <InputLabel id="level-label">Rol</InputLabel>
                    <Controller
                        {...register("rolId", {
                            required: "Required",
                        })}
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Rol"
                                labelId="level-label"
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <MenuItem value="">Selecciona un rol</MenuItem>
                                {roles.map((e, index) => (
                                    <MenuItem key={index} value={e.id}>
                                        {e.rol}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
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
