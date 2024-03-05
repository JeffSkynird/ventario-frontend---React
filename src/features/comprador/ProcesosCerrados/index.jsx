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
import { getLastOfferById } from '../../../helpers/General';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error , refetch,} = useQuery(['getResults',usuario.token,'vendedor',usuario.user.companyId], obtenerTodosCerrados)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])

  const columns = [
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{display:'flex'}}>
          <IconButton aria-label="delete" onClick={() => {
            //navigate('/buscador/'+value.row.original.id, { state:{item: value.row.original,isNew:false}})
            navigate('/cerrados/'+value.row.original.id, { state:{isEdited:true} })

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
      Cell: ({ row }) => (<Chip label={row.original?.box?.descriptionVentario} color="primary"/>)
  
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
      Cell: ({ row }) => (<span>{row.original?.visits?.length>0?getLastOfferById(row.original?.visits)?.date:"-"}</span>)
    },
    {
      Header: 'Oferta',
      accessor: 'oferta',
      Cell: ({ row }) => (<span>{row.original?.offers?.length>0?"$"+getLastOfferById(row.original?.offers)?.total:"-"}</span>)
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

  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography >Procesos cerrados</Typography>
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

