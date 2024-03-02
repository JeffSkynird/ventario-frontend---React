import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../../hooks/useAuth';
import Table from '../../../../components/table/Table'
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { crear, editar, eliminar,obtenerTodos } from '../../../../services/api/regiones/regiones';
import Modal from './ModalComuna';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token, selectedTag], obtenerTodos)
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
      accessor: 'region',
    },
    {
      Header: 'Estado',
      accessor: 'status',
      Cell: ({ row }) => (<Chip label={row.original.status ? "Activo" : "Inactivo"} color="primary" />)

    },
  ]


  const crearComuna = async (name,id) => {
    mostrarLoader(true)
    const obj = {
        "id": id,
        "region": name,
    }
    let data1;
    if(open.item!=null){
      data1 = await editar(obj, usuario.token)
    }else{
      data1 = await crear(obj, usuario.token)
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
      <Modal  open={open} setOpen={setOpen} title={"region"} refetch={refetch} confirm={crearComuna} />
      
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography >Regiones</Typography>
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

