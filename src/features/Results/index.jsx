import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { eliminarUsuario, obtenerUsuarios } from '../../services/api/users/users'
import Button from '@mui/material/Button'
import { useAuth } from '../../hooks/useAuth';
import { cerrarSesion } from '../../services/api/auth/login';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../components/table/Table'
import { Box, Breadcrumbs, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {  obtenerPdf, obtenerPorTag, obtenerTodos } from '../../services/api/generations/generations';
import { imprimirResultados } from '../../services/api/results/results';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import Modal from './components/Modal';
import { crear ,eliminar, eliminarPorGeneracion, obtenerTodos as obtenerTags} from '../../services/api/tags/tags';
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
      Header: 'Tag',
      accessor: 'tag',
      Cell: ({ row }) => ( row.original.tag!=null?<Chip label={row.original.tag.name} onDelete={()=>handleDelete(row.original.id)} color="primary" variant="outlined"/>:<Modal refetch={refetch} obtenerLista={obtenerLista} tags={tags} generation_id={row.original.id}/>)
    },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: ({ row }) => (<Chip label={row.original.status} color="primary"/>
      )
    },
    {
      Header: 'Iniciado en',
      accessor: 'created_at',
    },
    {
      Header: 'Finalizado en',
      accessor: 'updated_at',
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      Cell: (value) => (
        <div style={{display:'flex'}}>
          <IconButton aria-label="delete" onClick={() => {
            navigate('/buscador/'+value.row.original.id)
          }
          }>
            <RemoveRedEyeOutlinedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={()=>{
            
            imprimir(value.row.original.id)}
            
          }>
            <CloudDownloadOutlinedIcon />
          </IconButton>
     
        </div>

      )
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
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} >
          {
            selectedTag!=0 && <Chip label={"Todos"} onClick={()=>filtrarPorTag(0)} sx={{marginRight:'5px'}}/>
          }
          {
            tags.map((tag)=>(
              <Chip key={tag.id} label={tag.name} onClick={()=>filtrarPorTag(tag.id)} sx={{marginRight:'5px'}} onDelete={()=>eliminarRegistro(tag.id)}/>
            ))
          }
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

