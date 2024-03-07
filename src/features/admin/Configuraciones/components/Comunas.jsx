import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../../hooks/useAuth';
import Table from '../../../../components/table/Table'
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {  obtenerTodos,eliminar, editar, crear } from '../../../../services/api/comunas/comunas';
import Modal from './ModalComuna';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token], obtenerTodos)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState({visible:false,item:null})


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
            //navigate('/bodegas/' + value.row.original.id, { state: { isEdited: true } })
            setOpen({visible:true,item:value.row.original})
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
      Header: 'Nombre',
      accessor: 'comuna',

    },
    {
      Header: 'Región',
      Cell: ({ row }) => (<span >{row.original.regione?.region}</span>)
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
      Bodegas
    </Typography>,
  ];
  const crearComuna= async (obj) => {
    mostrarLoader(true)
    const objFinal = {
        "id": obj.id,
        "comuna": obj.name,
        "regionId": obj.regionId
    }
    let data1;
    if(open.item!=null){
      data1 = await editar(objFinal, usuario.token)
    }else{
      data1 = await crear(objFinal, usuario.token)
    }
    mostrarLoader(false)
    mostrarNotificacion(data1)
    if(data1.status=="success"){
        refetch()
        setOpen({visible:false,item:null})
    }
}
  return (
    <div>
      <Grid container spacing={2} >
      <Modal open={open} setOpen={setOpen} title={"comuna"} refetch={refetch}  confirm={crearComuna}/>
      
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography >Comunas</Typography>
          <Button variant="contained" onClick={() => {
           setOpen({visible:true,item:null})
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

