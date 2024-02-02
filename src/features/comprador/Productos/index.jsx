import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {  obtenerPdf, obtenerPorTag, obtenerTodos2 } from '../../../services/api/generations/generations';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
 const [data,setData] = useState([
  {
      tag:"GREENVIC",
      status:"SAN FERNANDO",
      estado:"ME-02020013",
      visita: "CJ-OOIOOOI",
      statuss: "CJ ARMAQ 4,50KG GRAPE GWICH",
      oferta: "5K",
      formulario:"9.230",
      fechaRetiro:"20.150",
      precio:150,
      ofertaS:"S",
      imagen:"Si",
      ventamin:"",
      restricciones:"001"
      
  }
  
]) 
  const navigate = useNavigate();
  const [tags, setTags] = useState([])


 const columns = [
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: (value) => (
      <div style={{display:'flex'}}>
        <IconButton aria-label="delete" onClick={() => {
          navigate('/generation/'+value.row.original.id, { state:{isEdited:true} })
        }
        }>
          <RemoveRedEyeOutlinedIcon />
        </IconButton>
   
      </div>

    )
  },
  {
    Header: 'Empresa',
    accessor: 'tag',
    Cell: ({ row }) => (<Chip label={row.original.tag} color="primary"/>)

  },
  {
    Header: 'Bodega',
    accessor: 'status',
  },
  {
    Header: 'Cod Emp',
    accessor: 'estado',
  },
  {
    Header: 'Cod Ventario',
    accessor: 'visita',
  },
  {
    Header: 'Descripción Item',
    accessor: 'statuss',
  },
  {
    Header: 'Kilos',
    accessor: 'oferta',
  },
  {
    Header: 'Armado',
    accessor: 'formulario',
  },
  {
    Header: 'Por armar',
    accessor: 'fechaRetiro',
  },
  {
    Header: 'Precio',
    accessor: 'precio',
  },
  {
    Header: 'Oferta S/N',
    accessor: 'ofertaS',
  },
  {
    Header: 'Imagen',
    accessor: 'imagen',
  },
  {
    Header: 'Venta mínima',
    accessor: 'ventamin',
  },
  {
    Header: 'Restricciones',
    accessor: 'restricciones',
  },
]


  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography color="initial">Procesos activos</Typography>
        </Grid>
      
        <Grid item xs={12} >
         
        <Table columns={columns} data={data }  />

        </Grid>
      </Grid>
    </div>
  )
}

