import { Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { obtenerTodosFiltro, sendClientMessage } from '../../../../../services/api/chats/chats';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function index(props) {
    const {item} = props
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        console.log("CULO")
        console.log(props)
        if(props.processID){
            async function fetch() {
                const data = await obtenerTodosFiltro(props.token, props.processID)
                //        { sender: "Tú", message: "Hola" },
                //        { sender: "Vendedor", message: "Hola, ¿cómo estás?" },
                /*
                  {
                    sender: "Sistema",
                    message: "# oferta editada #",
                  },
                */
                setMessages(data)
            }
            fetch();
        }
    
    }, [])
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const refreshSearch = async () => {
        const data = await obtenerTodosFiltro(props.token, props.processID)
        setMessages(data)
    }
    const sendMessage = async () => {

        const obj = {
            "emisorId":props.userId,
            "receptorId":props.customerId,
            "typeId":2,
            "message":inputValue,
            "processId":props.processID
        }
       const data = await sendClientMessage(obj, props.token)
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
    return offers[offers.length-1]
  }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} >
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
                                    <td>{getLastOfferById(item.visits)?.date||'-'}</td>
                                    <td>{getLastOfferById(item.visits)?.schedule?.schedule||'-'}</td>
                                    <td>No</td>
                                    <td>{getLastOfferById(item.visits)?.visitStatus.status||'-'}</td>
                                </tr>
                            </table>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper style={{ padding: 20, width: '100%', display: 'flex', gap: 5 }}>
                            <table border="1" style={{ width: '60%', }}>
                                <caption style={{ fontWeight: 'bold' }}>Oferta enviada</caption>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Neto</th>
                                </tr>
                                < tr >
                                    < td > {item.box?.product?.name.substring(0, 12)||'-'}... </ td >
                                    < td > {getLastOfferById(item.offers)?.quantity||'-'} </ td >
                                    < td > {getLastOfferById(item.offers)?.price||'-'} </ td >
                                </tr>
                            </table>
                            <table border="1" style={{ width: '40%', height: 10, }}>
                                <caption style={{ fontWeight: 'bold' }}>-</caption>
                                <tr>
                                    <th>Total Neto</th>
                                    <th>Status</th>
                                </tr>
                                < tr >
                                    < td > {getLastOfferById(item.offers)?.total||'-'} </ td >
                                    < td > {getLastOfferById(item.offers)?.offerStatus?.status||'-'} </ td >
                                </tr>

                            </table>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper style={{padding:10}}>
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
                                    className={`message ${message.emisorId === props.userId? "sent  message-self" : "received"
                                        }  `}
                                >
                                    <div className="message-sender">{message.emisorId == props.userId ? "Yo" : message?.emisor?.name}</div>
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
                            <Button onClick={sendMessage}>Enviar</Button>
                        </Paper>
                    </div>
                </Paper>

            </Grid>
        </Grid>
    )
}
