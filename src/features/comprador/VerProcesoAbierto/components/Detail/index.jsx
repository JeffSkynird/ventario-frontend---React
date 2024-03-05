import { Button, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import InventoryIcon from '@mui/icons-material/Inventory';
import './style.css'
import { obtenerTodosFiltro, sendVendorMessage } from '../../../../../services/api/chats/chats';
import { obtenerTodosFiltro as obtenerCompleto } from '../../../../../services/api/processes/processes';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
export default function index(props) {
    const { item } = props
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([
    ]);
    const [otherProcesses, setOtherProcesses] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (props.processID) {
            async function fetch() {
                console.log("FECHANDO")
                const data = await obtenerTodosFiltro(props.token, props.processID)
                const data2 = await obtenerCompleto({ customerId: props.customerId }, props.token, 'completo', props.companyId)
                //        { sender: "Tú", message: "Hola" },
                //        { sender: "Vendedor", message: "Hola, ¿cómo estás?" },
                /*
                  {
                    sender: "Sistema",
                    message: "# oferta editada #",
                  },
                */
                console.log(data2)
                console.log(data)
                setMessages(data)
                setOtherProcesses(data2)

            }
            fetch();
        }

    }, [])
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const [inputValue, setInputValue] = useState("");


    const refreshSearch = async () => {
        const data = await obtenerTodosFiltro(props.token, props.processID)
        setMessages(data)
    }
    
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const sendMessage = async () => {

        const obj = {
            "emisorId":props.userId,
            "receptorId":props.customerId,
            "typeId":2,
            "message":inputValue,
            "processId":props.processID
        }
       const data = await sendVendorMessage(obj, props.token)
        if(data.status=="success"){
            refreshSearch()
        }
    }
    const handleSendMessage = () => {
        if (inputValue) {
            setMessages([
                ...messages,
                { sender: "Tú", message: inputValue },
            ]);
            setInputValue("");
        }
    };
    const getLastOfferById = (offers) => {
        offers.sort((a, b) => (a.id > b.id) ? 1 : -1)
        return offers[offers.length - 1]
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} >
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Paper style={{ padding: 20, width: '100%' }}>
                            <table border="1" style={{ width: '100%' }}>
                                <caption style={{ fontWeight: 'bold' }}>Fecha de propuesta de visita</caption>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Sujeto a inspeccion</th>
                                    <th>Status</th>
                                </tr>
                                <tr>
                                    <td>{getLastOfferById(item.visits)?.date || '-'}</td>
                                    <td>{getLastOfferById(item.visits)?.schedule?.schedule || '-'}</td>
                                    <td>No</td>
                                    <td>{getLastOfferById(item.visits)?.visitStatus.status || '-'}</td>
                                </tr>
                            </table>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper style={{ padding: 20, width: '100%', display: 'flex', gap: 5 }}>
                            <table border="1" style={{ width: '60%', }}>
                                <caption style={{ fontWeight: 'bold' }}>Oferta recibida</caption>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Neto</th>
                                </tr>
                                < tr >
                                    < td > {item.box?.product?.name.substring(0, 12) || '-'}... </ td >
                                    < td > {getLastOfferById(item.offers)?.quantity || '-'} </ td >
                                    < td > {getLastOfferById(item.offers)?.price || '-'} </ td >
                                </tr>

                            </table>
                            <table border="1" style={{ width: '40%', height: 10 }}>
                                <caption style={{ fontWeight: 'bold' }}>-</caption>
                                <tr>
                                    <th>Total Neto</th>
                                    <th>Status</th>
                                </tr>
                                < tr >
                                    < td > {getLastOfferById(item.offers)?.total || '-'} </ td >
                                    < td > {getLastOfferById(item.offers)?.offerStatus?.status || '-'} </ td >
                                </tr>

                            </table>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={6}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <Typography style={{ fontWeight: 'bold' }}>Mensajes</Typography>
                    <IconButton aria-label="delete" onClick={refreshSearch}>
                        <RefreshIcon />
                    </IconButton>
                </div>
                <div className="chat-container">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.emisorId === props.userId ? "sent  message-self" : "received"
                                    }  `}
                            >
                                <div className="message-sender">{message.emisorId == props.userId ? "Yo" : message?.emisor?.name}</div>
                                <div className="message-content">{message.message}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />

                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Escribir mensaje..."
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <Button onClick={sendMessage}>Enviar</Button>
                    </div>
                </div>
            </Grid>

            <Grid xs={12}>

                <List dense={true} sx={{ height: 150, overflowY: 'auto' }} subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold' }}>
                        Procesos activos del comprador
                    </ListSubheader>
                }>
                    {
                        otherProcesses.map((e, index) => (
                            <ListItem disablePadding key={index}>
                                <ListItemButton onClick={() => navigate('/activos/' + e.id, { state: { item: e, isNew: false } })
                                }>
                                    <ListItemText primary={e?.box?.product?.name} secondary={e?.box?.product?.description} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    )
}
