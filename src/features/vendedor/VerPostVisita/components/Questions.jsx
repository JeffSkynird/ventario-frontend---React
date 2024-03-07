import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Alert, Autocomplete, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModalFeeback from './ModalFeeback'
export default function Form(props) {
    const { state } = useLocation();
    const { mostrarLoader, mostrarNotificacion, usuario } = useAuth()
    const [datos, setDatos] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedStep, setSelectedStep] = React.useState(0)
    const [open,setOpen]  = React.useState(false)
    const [selected, setSelected] = useState(null)
    const [answers, setAnswers] = React.useState({ uno: null, dos: null })


    const responder = (quest, resp) => {
        setAnswers({ ...answers, [quest]: resp })
        if(quest=="uno"&&resp){
            setSelectedStep(1)
        }
        if(quest=="uno"&&!resp){
            setSelectedStep(2)
        }
        if(quest=="dos"&&resp){
            //alert("FORMULARIO CIERRE")
            props.goTo(2,null)
        }
        if(quest=="dos"&&!resp){
            setSelectedStep(3)
        }
        if(quest=="tres"&&resp){
            //alert("FORMUlaRIO REAGENDAR")
            props.goTo(1,1)
        }
        if(quest=="tres"&&!resp){
            props.goTo(3,null)
        }
        if(quest=="cuatro"&&resp){
            //alert("FORMUlaRIO PROPUESTA POST VISITA")
            props.goTo(1,0)
        }
        if(quest=="cuatro"&&!resp){
            setOpen(true)
        }
    }
    return (
        <Grid container spacing={2} >
               <ModalFeeback open={open} setOpen={setOpen}/>

            <Grid item xs={12}>
                <Accordion expanded={selectedStep == 0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ fontWeight: selectedStep == 0 ? 'bold' : 'normal' }}
                        onClick={() => setSelectedStep(0)}
                    >
                        ¿Hizo la visita?
                    </AccordionSummary>
                    <AccordionDetails >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            Eliga una opción
                            <div style={{ display: 'flex', gap: 3 }}>
                                <Button variant="contained" color="primary" onClick={() => responder('uno', true)}>Sí</Button>
                                <Button variant="contained" color="secondary" onClick={() => responder('uno', false)}>No</Button>
                            </div>

                        </Box>

                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={selectedStep == 1} style={{ display: answers.uno == true ? "block" : "none" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        sx={{ fontWeight: selectedStep == 1 ? 'bold' : 'normal' }}
                        onClick={() => setSelectedStep(1)}

                    >
                        Hizo la compra
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            Eliga una opción
                            <div style={{ display: 'flex', gap: 3 }}>
                                <Button variant="contained" color="primary" onClick={() => responder('dos', true)}>Sí</Button>
                                <Button variant="contained" color="secondary" onClick={() => responder('dos', false)}>No</Button>
                            </div>

                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={selectedStep == 2} style={{ display: answers.uno == false ? "block" : "none" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={{ fontWeight: selectedStep == 2 ? 'bold' : 'normal' }}
                        onClick={() => setSelectedStep(2)}

                    >
                        ¿Quiere reagendar?
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            Eliga una opción
                            <div style={{ display: 'flex', gap: 3 }}>
                                <Button variant="contained" color="primary" onClick={() => responder('tres', true)}>Sí</Button>
                                <Button variant="contained" color="secondary" onClick={() => responder('tres', false)}>No</Button>
                            </div>

                        </Box>
                    </AccordionDetails>

                </Accordion>
                <Accordion expanded={selectedStep == 3} style={{ display: answers.dos == false ? "block" : "none" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={{ fontWeight: selectedStep == 3 ? 'bold' : 'normal' }}
                        onClick={() => setSelectedStep(3)}

                    >
                        ¿Quiere hacer una nueva propuesta?
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            Eliga una opción
                            <div style={{ display: 'flex', gap: 3 }}>
                            <Button variant="contained" color="primary"    onClick={()=>responder('cuatro',true)}>Sí</Button>
                                <Button variant="contained" color="secondary"    onClick={()=>responder('cuatro',false)}>No</Button>
                            </div>

                        </Box>
                    </AccordionDetails>


                </Accordion>
            </Grid>
        </Grid>
    )
}
