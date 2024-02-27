import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Alert, Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Step, StepLabel, Stepper, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { obtenerPdf, obtenerPorTag, obtenerTodos } from '../../../services/api/generations/generations';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Questions from './components/Questions';
import OfferForm from './components/OfferForm';
import CloseForm from './components/CloseForm';
import DateForm from './components/DateForm';


import { crear, eliminar, eliminarPorGeneracion, obtenerTodos as obtenerTags } from '../../../services/api/tags/tags';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token, selectedTag], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [activeStep, setActiveStep] = React.useState(0);
  const [subStep, setSubStep] = React.useState(0);


  React.useEffect(() => {
    obtenerLista()
  }, [])
  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data1 = await eliminar(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
    obtenerLista()
  }
  async function obtenerLista() {
    const data1 = await obtenerTags(usuario.token)
    setTags(data1.data)
  }

  const handleDelete = async (id) => {
    mostrarLoader(true)
    const data1 = await eliminarPorGeneracion(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
    refetch()
  }

  const columns = [
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{ display: 'flex' }}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/buscador/' + value.row.original.id, { state: { isEdited: true } })
          }
          }>
            <RemoveRedEyeOutlinedIcon />
          </IconButton>

        </div>

      )
    },
    {
      Header: 'Productos',
      accessor: 'tag',
      Cell: ({ row }) => (<Chip label={row.original.tag} color="primary" />)

    },
    {
      Header: 'Fecha',
      accessor: 'status',
    },
    {
      Header: 'Estados',
      accessor: 'estado',
    }

  ]
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      SISTEMA
    </Link>,
    <Link
      underline="none"
      key="2"
      color="inherit"

    >
      Administración
    </Link>,
    <Typography key="3" color="text.primary">
      Resultados
    </Typography>,
  ];

  const imprimir = async (id) => {
    const dat = await obtenerPdf(id, usuario.token);
    const url = window.URL.createObjectURL(new Blob([dat]));
    let a = document.createElement('a');
    a.href = url;
    a.download = 'generacion.pdf';
    a.click();
  }

  const filtrarPorTag = async (id) => {
    setSelectedTag(id)
  }
  const handleNext = () => {
    if (activeStep == 1) {
      setActiveStep(3);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const goTo = (step, sStep) => {
    setActiveStep(step)
    if (sStep) {
      setSubStep(sStep)
    }
  }
  const steps = ['Preguntas', 'Formulario adicional', 'Formulario de cierre'];
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography>Formulario post visita</Typography>
        </Grid>

        <Grid item xs={12} >
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel >{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <React.Fragment>
              <Box sx={{ paddingTop: 2 }}>
                {
                  activeStep == 0 && (
                    <Questions goTo={goTo} />
                  )
                }
                {
                  activeStep == 1 && (
                    <div>
                      {

                        subStep == 0 && (

                          <OfferForm />
                        )
                      }
                      {
                        subStep == 1 && (
                          <DateForm />
                        )
                      }
                    </div>
                  )
                }
                {
                  activeStep == 2 && (
                    <CloseForm />
                  )
                }
                {
                  activeStep == 3 && (
                    <Alert severity="success">Registro completado</Alert>
                  )
                }
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {
                  activeStep < steps.length && (
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Atrás
                    </Button>
                  )
                }
                <Box sx={{ flex: '1 1 auto' }} />
                {
                  activeStep < steps.length && (
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Button>
                  )
                }
              </Box>
            </React.Fragment>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

