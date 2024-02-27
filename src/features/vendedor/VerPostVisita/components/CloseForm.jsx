import { Alert, Autocomplete, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAuth } from '../../../../hooks/useAuth';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { obtenerTodos } from '../../../../services/api/pacients/pacients';
import { obtener } from '../../../../services/api/exams/exams';
import { obtenerResultadosId } from '../../../../services/api/generations/generations';
import { Box } from '@mui/system';
import { editar } from '../../../../services/api/results/results';
import RemoveIcon from '@mui/icons-material/Remove';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import ModalProduct from './ModalProduct'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [open, setOpen] = React.useState(false)
    const [datos, setDatos] = useState([{
        value: 0,
        id: 1,
        name: "Caja",
        unit: 100,
        price: 250,
        total: 25.00
    },
    {
        value: 0,
        id: 2,
        name: "Caja 2",
        unit: 100,
        price: 250,
        total: 25.00
    },
    {
        value: 0,
        id: 2,
        name: "Caja 2",
        unit: 100,
        price: 250,
        total: 25.00
    },
    {
        value: 0,
        id: 2,
        name: "Caja 2",
        unit: 100,
        price: 250,
        total: 25.00
    },
    {
        value: 0,
        id: 2,
        name: "Caja 2",
        unit: 100,
        price: 250,
        total: 25.00
    }])
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState(null)
    //const { isLoading, isError, data, error, refetch } = useQuery(['getPacients', usuario.token], obtenerTodos)
    // const { data: dataExams } = useQuery(['getExams', usuario.token], obtener)
    const handleCellEditCommit = React.useCallback(
        ({ id, field, value }) => {
            const updatedRows = datos.map((row) => {
                if (row.id === id) {
                    return { ...row, [field]: value };
                }
                return row;
            });
            setDatos(updatedRows);
        },
        [datos],
    );
    /*     useEffect(() => {
            if (state) {
                async function fetchData() {
                    const data = await obtenerResultadosId(state.id, usuario.token)
                    setDatos(data.data)
                }
                fetchData()
            }
        }
            , [state])
     */
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const getBase64 = (file, callback) => {
        let base;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            base = reader.result.toString()
            let base64 = base.slice(base.indexOf(',') + 1);
            callback(base64)
        };
        reader.onerror = function (error) {
        };
        return base;
    }




    const subir = (e, id) => {
        const file = e.target.files[0]
        getBase64(file, (valor) => {

            const data = datos.map((row) => {
                if (row.id == id) {
                    return { ...row, value: valor, txt: 1 };
                }
                return row;
            }
            )
            console.log(data)
            setDatos(data)
        });
    }

    const columns = [
        {
            field: 'value',
            headerName: 'Valor',
            width: 150,
            renderCell: (cellValues) => {
                return (

                    <IconButton color="primary" aria-label="upload picture" component="label" style={{ color: cellValues.row?.txt ? 'green' : 'auto' }} >

                        <RemoveIcon />

                    </IconButton>

                );
            },
        },
        {
            field: 'id',
            headerName: 'ID',
            width: 150,
            valueGetter: (params) => {
                return params.row.id;
            }

        },
        {
            field: 'name',
            headerName: 'Producto',
            width: 150,
            valueGetter: (params) =>
                params.row.name,
        },
        {
            field: 'unit',
            headerName: 'Unidades',
            width: 150,
            editable: true,
            valueGetter: (params) =>
                params.row.unit
        },
        {
            field: 'price',
            headerName: 'Precio Unit',
            width: 150,
            valueGetter: (params) =>
                params.row.price
        },
        {
            field: 'total',
            headerName: 'Neto',
            width: 150,
            valueGetter: (params) =>
                params.row.total

        },
    ]
    const breadcrumbs = [
        <Link underline="none" key="1" color="inherit"  >
            SISTEMA
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/resultados"
        >
            CERRADO
        </Link>,
        <Typography key="3" color="text.primary">
            {state ? "Editar" : "Crear"}
        </Typography>,
    ];
    const eliminarExamen = (id) => {
        if (!id) {
            const newDatos = datos.filter(item => item.id !== id)
            setDatos(newDatos)
        }
    }
    const agregar = () => {
        setOpenModal(true)
    }

    const buscar = (dt, datosItem) => {
        let item = datosItem.find(item => item.id == dt)
        return item;
    }
    const entrar = async () => {
        mostrarLoader(true)
        let dt = {
            results: datos,
            order_id: state.id
        }

        console.log(dt)
        let data;
        if (state) {
            data = await editar(dt, usuario.token)
        } else {
            data = await crear(dt, usuario.token)
        }
        mostrarLoader(false)
        mostrarNotificacion(data)
        if (data.status == 200) {
            window.location.href = "/resultados"
        }
    }
    const getName = (id, data) => {
        let object = null
        if (data != null) {
            data.data.map((e) => {
                if (id == e.id) {
                    object = { ...e }
                }
            })
        }

        return object
    }
    return (
        <Grid container spacing={2} >
            <ModalProduct open={open} setOpen={setOpen}

            />
            <Grid item xs={12}>
                <Typography sx={{ fontWeight: 'bold' }}>Formulario de cierre</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>

                        <TextField
                            id=""
                            sx={{ width: '100%' }}
                            disabled
                            size="small"
                            label="Nombre del comprador"
                            value={'juan'}
                        //onChange={}

                        />
                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                            id=""
                            sx={{ width: '100%' }}
                            size="small"
                            disabled
                            label="Nombre del vendedor"
                            value={'juan'}
                        //onChange={}

                        />
                    </Grid>
                    <Grid item xs={12} md={11}>

                        <TextField
                            id=""
                            type="date"
                            sx={{ width: '100%' }}
                            size="small"
                            label="Fecha de carga"
                            value={'10/10/2022'}
                        //onChange={}

                        />
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}   >
                                <DatePicker
                                    label="Fecha de nacimiento  "
                                  /*   value={borndate}
                                    onChange={(newValue) => {
                                        setBorndate(newValue);
                                    }} */
                                    name="born_date"
                                    disableFuture
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => <TextField style={{ width: '100%' }}  {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Tooltip title="Factura">

                            <IconButton aria-label="delete">
                                <ReceiptIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Guia de despacho">

                            <IconButton aria-label="Guia de despacho">
                                <InventoryIcon />
                            </IconButton>
                        </Tooltip>

                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={12} md={9}>
                <Box sx={{ width: '100%' }}>
                    <DataGrid
                        rows={datos}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[5]}
                        onCellEditCommit={handleCellEditCommit}
                        autoHeight
                        disableSelectionOnClick
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    id=""
                    sx={{ width: '100%' }}
                    size="small"
                    disabled
                    label="Total neto"
                    value={'0.00'}
                //onChange={}

                />
                <TextField
                    id=""
                    sx={{ width: '100%' }}
                    size="small"
                    disabled
                    label="Total IVA"
                    value={'0.00'}
                //onChange={}

                />
                <TextField
                    id=""
                    sx={{ width: '100%' }}
                    size="small"
                    disabled
                    label="Total Bruto"
                    value={'0.00'}
                //onChange={}

                />
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}
                >Agregar producto</Button>

            </Grid>
            <Grid item xs={12}>

                <Button
                    onClick={entrar}
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
