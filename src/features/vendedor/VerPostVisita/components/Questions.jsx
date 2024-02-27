import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Alert, Autocomplete, Breadcrumbs, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { obtenerTodos } from '../../../../services/api/pacients/pacients';
import { obtener } from '../../../../services/api/exams/exams';
import { obtenerResultadosId } from '../../../../services/api/generations/generations';
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
    const { isLoading, isError, data, error, refetch } = useQuery(['getPacients', usuario.token], obtenerTodos)
    const { data: dataExams } = useQuery(['getExams', usuario.token], obtener)
    const [answers, setAnswers] = React.useState({ uno: null, dos: null })
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
    useEffect(() => {
        if (state) {
            async function fetchData() {
                const data = await obtenerResultadosId(state.id, usuario.token)
                setDatos(data.data)
            }
            fetchData()
        }
    }
        , [state])

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
            field: 'category_name',
            headerName: 'Categoría',
            width: 150,
            valueGetter: (params) => {
                return params.row.exam.category.name;
            }

        },
        {
            field: 'exam_name',
            headerName: 'Nombre',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.name,
        },
        {
            field: 'exam_description',
            headerName: 'Detalle',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.description
        },
        {
            field: 'exam_unity',
            headerName: 'Unidad',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.unity
        },
        {
            field: 'value_type_name',
            headerName: 'Tipo de valor',
            width: 150,
            valueGetter: (params) =>
                params.row.exam.value_type.name,
        },
        {
            field: 'value',
            headerName: 'Valor',
            width: 150,
            editable: true,
            renderCell: (cellValues) => {
                return (

                    cellValues.row.exam.value_type.id !== 4 ?
                        cellValues.value
                        :
                        <IconButton color="primary" aria-label="upload picture" component="label" style={{ color: cellValues.row?.txt ? 'green' : 'auto' }} >
                            <input hidden accept="image/*" type="file" onChange={(e) => subir(e, cellValues.row.id)} />
                            <FileUploadIcon />

                        </IconButton>


                );
            }
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
            Resultados
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
    const campos = [

        {
            name: 'id',
            label: 'Examen',
            type: 'select',
            data: dataExams != null ? dataExams.data : [],
            style: { width: '100%' },
        }

    ];
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
