import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
//import { obtenerPdf, obtenerPorTag, obtenerTodos } from '../../../services/api/generations/generations';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Modal from './components/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const [data,setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

 // const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token, selectedTag], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)

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
            navigate('/bodegas/' + value.row.original.id, { state: { isEdited: true } })
          }
          }>
            <LockOpenIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => {
            if (confirm("¿Está seguro de eliminar el registro?") == true) {
              eliminarRegistro(value.row.original.id)
            }
          }
          }>
            <CloseIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => {
           setOpen(true)
          }
          }>
            <RemoveRedEyeOutlinedIcon />
          </IconButton>
        </div>

      )
    },
    {
      Header: 'Tipo Usuario',
      accessor: 'tag',
      Cell: ({ row }) => (<Chip label={"Vendedor"} color="primary" />)

    },
    {
      Header: 'Nombre',
      accessor: 'status',
      Cell: ({ row }) => (<span>Juan</span>)
    },
    {
      Header: 'Tipo',
      accessor: 'estado',
      Cell: ({ row }) => (<span>Productos</span>)
    },
    {
      Header: 'Status',
      accessor: 'statuss',
      Cell: ({ row }) => (<span>Pendiente</span>)

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
      Bodegas
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
      <Modal open={open} setOpen={setOpen} title={"industrias"}/>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography >Autorizaciones</Typography>
        </Grid>

        <Grid item xs={12} >
          {isLoading && (
            <Box >
              <Skeleton height={100} />
            </Box>
          )}
          {!isLoading && <Table columns={columns} data={!isLoading ? data : []} />}

        </Grid>
      </Grid>
    </div>
  )
}

