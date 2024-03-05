import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Modal from './components/Modal';
import { obtenerTodosCerrados } from '../../../services/api/processes/processes';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error , refetch,} = useQuery(['getResults',usuario.token,'comprador',usuario.user.id], obtenerTodosCerrados)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])

  const getLastOfferById = (offers) => {
    offers.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return offers[offers.length-1]
  }
  const columns = [
    {
      Header: 'Productos',
      accessor: 'tag',
      Cell: ({ row }) => (<Chip label={row.original.box.descriptionVentario} color="primary"/>)

    },
    {
      Header: 'Fecha',
      accessor: 'createdAt',
    },
    {
      Header: 'Estados',
      accessor: 'statusId',
    },
    {
      Header: 'Visita',
      accessor: 'visits',
      Cell: ({ row }) => (<span>{row.original?.visits.length>0?getLastOfferById(row.original?.visits)?.date:"-"}</span>)
    },
    {
      Header: 'Oferta',
      accessor: 'oferta',
      Cell: ({ row }) => (<span>{row.original?.offers.length>0?"$"+getLastOfferById(row.original?.offers)?.total:"-"}</span>)
    },
    {
      Header: 'Formulario',
      accessor: 'formulario',
      Cell: ({ row }) => ( <Chip label={"Formulario"+1} color="primary" variant="outlined"/>)
    },
    {
      Header: 'Fecha de retiro',
      accessor: 'updatedAt',
    },
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
    const dat = await obtenerPdf(id,usuario.token);
    const url = window.URL.createObjectURL(new Blob([dat]));
    let a = document.createElement('a');
    a.href = url;
    a.download = 'generacion.pdf';
    a.click();
  }

  const filtrarPorTag = async (id) => {
    setSelectedTag(id)
  }
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography color="initial">Procesos cerrados</Typography>
        </Grid>
       
        
        <Grid item xs={12} >
          {isLoading && (
            <Box >
              <Skeleton height={100} />
            </Box>
          )}
          {!isLoading && <Table columns={columns} data={!isLoading &&!isError? data : []}  />}

        </Grid>
      </Grid>
    </div>
  )
}

