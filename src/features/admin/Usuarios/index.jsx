import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Avatar, Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { obtenerTodos, eliminar } from '../../../services/api/users/users';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
//import Modal from './components/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getAll', usuario.token], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])

  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data1 = await eliminar(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion({ type: data1.status, message: data1.message })
    

  }

  const columns = [
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{ display: 'flex' }}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/usuarios/' + value.row.original.id, { state: value.row.original })
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
      Header: 'Avatar',
      accessor: 'avatar',
      Cell: ({ row }) => (
        <Avatar alt="Remy Sharp" src={row.original.avatar} />
      )

    },
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Empresa',
      accessor: 'company',
      Cell: ({ row }) => (
        <span>{row.original.company?.razonSocial||"-"}</span>
      )
    },
    {
      Header: 'Usuario',
      accessor: 'username',
    },
    {
      Header: 'Correo',
      accessor: 'email',
    },
    {
      Header: 'DNI',
      accessor: 'dni',
    },
    {
      Header: 'Rol',
      accessor: 'role',
      Cell: ({ row }) => (<span>{row.original.rol?.rol}</span>)
    },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: ({ row }) => (<Chip label={row.original.status ? "Activo" : "Inactivo"} color="primary" />)
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
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography >Usuarios</Typography>
          <Button variant="contained" onClick={() => {
            navigate('/usuarios/crear')
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

