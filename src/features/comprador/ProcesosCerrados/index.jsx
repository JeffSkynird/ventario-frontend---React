import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {  obtenerPdf, obtenerPorTag, obtenerTodos } from '../../../services/api/generations/generations';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Modal from './components/Modal';
import { crear ,eliminar, eliminarPorGeneracion, obtenerTodos as obtenerTags} from '../../../services/api/tags/tags';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error , refetch,} = useQuery(['getResults',usuario.token,selectedTag], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])

  React.useEffect(() => {
    obtenerLista()
  },[])
  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data1 = await eliminar(id,usuario.token)
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
    const data1 = await eliminarPorGeneracion(id,usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
    refetch()
 }
 
  const columns = [
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{display:'flex'}}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/ver_proceso_cerrado/'+value.row.original.id, { state:{isEdited:true} })
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
      Cell: ({ row }) => (<Chip label={row.original.tag} color="primary"/>)

    },
    {
      Header: 'Fecha',
      accessor: 'status',
    },
    {
      Header: 'Fecha de retiro',
      accessor: 'fechaRetiro',
    },
    {
      Header: 'Formulario',
      accessor: 'formulario',
      Cell: ({ row }) => ( row.original.tag!=null?<Chip label={"Formulario"+row.original.formulario} color="primary" variant="outlined"/>:<Modal refetch={refetch} obtenerLista={obtenerLista} tags={tags} generation_id={row.original.id}/>)
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
          {!isLoading && <Table columns={columns} data={!isLoading &&!isError? data.data : []}  />}

        </Grid>
      </Grid>
    </div>
  )
}

