import { Alert, Autocomplete, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAuth } from '../../../../hooks/useAuth';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { obtenerTodos } from '../../../../services/api/pacients/pacients';
import { obtener } from '../../../../services/api/exams/exams';
import { Box } from '@mui/system';
import { editar } from '../../../../services/api/results/results';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import './style.css'
export default function Form(props) {
    const { state } = useLocation();
    const messagesEndRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const [messages, setMessages] = useState([
        { sender: "Tú", message: "Hola" },
        { sender: "Vendedor", message: "Hola, ¿cómo estás?" },
        { sender: "Tú", message: "Estoy bien, gracias. ¿Y tú?" },
        {
            sender: "Sistema",
            message: "# oferta editada #",
        },
        {
            sender: "Sistema",
            message: "A tu oferta le quedan 12 horas",
        },
    ]);
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [datos, setDatos] = useState([{
        id: 1,
        quantity: 44,
        price: 5000,
        total: 5000
    }])
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState(null)
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
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleSendMessage = () => {
        if (inputValue) {
            setMessages([
                ...messages,
                { sender: "Tú", message: inputValue },
            ]);
            setInputValue("");
        }
    };


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
            field: 'quantity',
            headerName: 'Cantidad',
            width: 150,
            editable: true,
            valueGetter: (params) => {
                return params.row.quantity;
            }

        },
        {
            field: 'price',
            headerName: 'Precio Neto',
            width: 150,
            editable: true,
            valueGetter: (params) =>
                params.row.price,
        },
        {
            field: 'total',
            headerName: 'Total Neto',
            width: 150,
            editable: true,
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
            FECHA
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
            <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Typography sx={{ fontWeight: 'bold' }}>Formulario oferta/visita</Typography>
                <img src="https://www.millerchemical.com/es/wp-content/uploads/sites/2/2021/03/apple-1199340951.png" style={{height:50,width:50}} alt="" srcset="" />

            </Grid>
            
            <Grid item xs={12}>
                <Alert severity="info">Producto 1 - Comuna Region - 3000 unidades - Venta minima 1000 unidades - Precio de referencia - Recibimos ofertas</Alert>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={2} >
                    <Grid item xs={12} >

                        <Box sx={{ width: '100%' }}>
                            <DataGrid
                                rows={datos}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onCellEditCommit={handleCellEditCommit}
                                autoHeight
                                pagination={false}
                                disableSelectionOnClick
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="date"
                            variant='filled'
                            sx={{ width: '100%' }}
                            label="Fecha"
                            value={"2017-05-24"}
                        //onChange={}

                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <TextField
                            type="time"
                            variant='filled'

                            sx={{ width: '100%' }}
                            label="Hora"
                            value={"10:00"}

                        //onChange={}

                        />
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={12} md={6}>
                <Paper style={{ padding: 10 }}>
                    <Typography style={{ fontWeight: 'bold', marginBottom: 5 }}>Mensajes</Typography>
                    <div className="chat-container">
                        <div className="chat-messages">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.sender === "Tú" ? "sent  message-self" : "received"
                                        }  `}
                                >
                                    <div className="message-sender">{message.sender}</div>
                                    <div className="message-content">{message.message}</div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />

                        </div>
                        <Paper className="chat-input">
                            <input
                                type="text"
                                placeholder="Escribir mensaje..."
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <Button onClick={handleSendMessage}>Enviar</Button>
                        </Paper>
                    </div>
                </Paper>

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
