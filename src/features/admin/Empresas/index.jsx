import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { obtenerTodos } from '../../../services/api/empresas/empresas';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
//import Modal from './components/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { eliminar } from '../../../services/api/empresas/empresas';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])

  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data1 = await eliminar(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
  }
  const columns = [
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{ display: 'flex' }}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/empresas/' + value.row.original.id, {  state: value.row.original  })
          }
          }>
            <RemoveRedEyeOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => {
            if (confirm("¿Está seguro de eliminar el registro?") == true) {
              eliminarRegistro(value.row.original.id)
            }
          }
          }>
            <DeleteOutlineIcon />
          </IconButton>
        </div>

      )
    },
    {
      Header: 'Razón Social',
      accessor: 'razonSocial',
    },

    {
      Header: 'RUT',
      accessor: 'RUT',
    },
   
    {
      Header: 'Celular',
      accessor: 'phone',
    },
    {
      Header: 'Status',
      accessor: 'status',
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
      Empresas
    </Typography>,
  ];

  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography >Empresas</Typography>
          <Button variant="contained" onClick={() => {
            navigate('/empresas/crear')
          }}>Crear</Button>
        </Grid>

        <Grid item xs={12} >
          {isLoading && (
            <Box >
              <Skeleton height={100} />
            </Box>
          )}
          {!isLoading && <Table columns={columns} data={!isLoading && !isError ? data : []} />}

        </Grid>
      </Grid>
    </div>
  )
}

