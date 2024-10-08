import { Button, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import InventoryIcon from '@mui/icons-material/Inventory';

import './style.css'
export default function index() {

    const [messages, setMessages] = useState([
        { sender: "Comprador", message: "Hola" },
        { sender: "Vendedor", message: "Hola, ¿cómo estás?" },
        { sender: "Comprador", message: "Estoy bien, gracias. ¿Y tú?" },
        {
          sender: "Sistema",
          message: "# oferta editada #",
        },
        {
          sender: "Sistema",
          message: "A tu oferta le quedan 12 horas",
        },
      ]);
   
      const [inputValue, setInputValue] = useState("");
    
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleSendMessage = () => {
        if (inputValue) {
          setMessages([
            ...messages,
            { sender: "Vendedor", message: inputValue },
          ]);
          setInputValue("");
        }
      };
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
                                    <td>12/01/2024</td>
                                    <td>16:30</td>
                                    <td>No</td>
                                    <td>Aceptada</td>
                                </tr>
                            </table>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper style={{ padding: 20, width: '100%', display: 'flex', gap: 5 }}>
                            <table border="1" style={{ width: '60%',  }}>
                                <caption style={{ fontWeight: 'bold' }}>Oferta recibida</caption>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Neto</th>
                                </tr>
                                < tr >
                                    < td > Producto 1 </ td >
                                    < td > 44 </ td >
                                    < td > $5.000 </ td >
                                </tr>
                                < tr >
                                    < td > Producto 2 </ td >
                                    < td > 12 </ td >
                                    < td > $7.890 </ td >
                                </tr>
                                < tr >
                                    < td > Producto 3 </ td >
                                    < td > 3 </ td >
                                    < td > $23.500 </ td >
                                </tr>
                            </table>
                            <table border="1" style={{ width: '40%', height: 10,  }}>
                                <caption style={{ fontWeight: 'bold' }}>-</caption>
                                <tr>
                                    <th>Total Neto</th>
                                    <th>Status</th>
                                </tr>
                                < tr >
                                    < td > $220.000 </ td >
                                    < td > Rechazada </ td >
                                </tr>

                            </table>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Typography style={{fontWeight:'bold'}}>Mensajes</Typography>
                <div className="chat-container">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender !== "Comprador" ? "sent  message-self" : "received" 
                                    }  `}
                            >
                                <div className="message-sender">{message.sender}</div>
                                <div className="message-content">{message.message}</div>
                            </div>
                        ))}
                               

                    </div>
                    <div className="chat-input">
                        <input
                            disabled
                            type="text"
                            placeholder="Escribir mensaje..."
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <Button disabled onClick={handleSendMessage}>Enviar</Button>
                    </div>
                </div>
            </Grid>
            
            <Grid xs={12}>

                <List dense={true} sx={{ height: 150, overflowY: 'auto' }} subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Procesos activos del comprador
                    </ListSubheader>
                }>
                    <ListItem disablePadding>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Producto 1"  secondary="Producto de descripción" />
                        </ListItemButton>

                    </ListItem>
                    <ListItem disablePadding>

                        <ListItemButton disabled>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Producto 2"  secondary="Producto de descripción"  />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>

                        <ListItemButton disabled>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Producto 3"   secondary="Producto de descripción"  />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>

                        <ListItemButton disabled>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Producto 4"   secondary="Producto de descripción" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
