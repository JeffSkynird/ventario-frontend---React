import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Chip, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {  obtenerTodos,eliminar } from '../../../services/api/products/products';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const { isLoading, isError, data, error, refetch, } = useQuery(['getAll', usuario.token], obtenerTodos)
  const [selectedTag, setSelectedTag] = useState(0)
  const navigate = useNavigate();
  const [tags, setTags] = useState([])


 const columns = [
  {
    Header: 'Acciones',
    accessor: 'action',
    Cell: (value) => (
      <div style={{display:'flex'}}>
        <IconButton aria-label="delete" onClick={() => {
          navigate('/productos/'+value.row.original.id, { state:{item:value.row.original} })
        }
        }>
          <RemoveRedEyeOutlinedIcon />
        </IconButton>
   
      </div>

    )
  },
  {
    Header: 'Empresa',
    Cell: ({ row }) => (<span>Empresa 1</span>)

  },
  {
    Header: 'Bodega',
    Cell: ({ row }) => (<span>Bodega 1</span>)

  },
  {
    Header: 'Cod Emp',
    Cell: ({ row }) => (<span>Cod Emp: 1</span>)


  },
  {
    Header: 'Cod Ventario',
    accessor: 'codVentario',
  },
  {
    Header: 'Descripción Item',
    accessor: 'description',
  },
  {
    Header: 'Kilos',
    accessor: 'totalUnits',
  },
  {
    Header: 'Armado',
    Cell: ({ row }) => (<span>10</span>)
  },
  {
    Header: 'Por armar',
    accessor: 'created_at',
  },
  {
    Header: 'Precio',
    accessor: 'unitPrice',
  },
  {
    Header: 'Oferta S/N',
    Cell: ({ row }) => (<Chip label={"S"} color="primary" />)

  },
  {
    Header: 'Imagen',
    Cell: ({ row }) => ( <img src={row.original?.boxes[0]?.boxImages[0]?.url} style={{width:50,height:50}}/>)
  },
  {
    Header: 'Venta mínima',
    accessor: 'minimumSale',
  },
  {
    Header: 'Restricciones',
    accessor: 'restriction',
  },
]


  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography>Mis productos</Typography>
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

