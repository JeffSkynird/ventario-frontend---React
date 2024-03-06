import React, { Fragment, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TableSelect from '../../../components/table/TableSelect'
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import emptyLottie from '../../../assets/lottie/empty.json'

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
//import { obtenerPdf, obtenerPorTag, obtenerTodos } from '../../../services/api/generations/generations';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Modal from './components/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
import { autorizar, obtenerTodos, obtenerTodosFiltro } from '../../../services/api/autorizations/autorizations';
import { obtenerTodosAdmin } from '../../../services/api/processes/processes';
import Lottie from 'lottie-react';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [obj, setObj] = useState({
    type: "product"
  })
  //const { isLoading, isError, data, error, refetch } = useQuery(['getResults', usuario.token, obj], obtenerTodos)
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)
  const [type, setType] = useState("producto")
  const [processes, setProcesses] = useState([])
  const [process, setProcess] = useState('')

  useEffect(() => {
    consultarDatos({ type: "producto" });
  }, [])
  const consultarDatos = async (obj) => {
    const datos = await obtenerTodosFiltro(obj, usuario.token);
    setData(datos)
  }

  const columns = [

    {
      Header: 'Vendedor',
      accessor: 'tag',
      Cell: ({ row }) => (<Chip label={"Vendedor"} color="primary" />)

    },
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Tipo',
      accessor: 'codVentario',
    },
    {
      Header: 'Stock',
      accessor: 'totalUnits',
    },
    {
      Header: 'Venta mínima',
      accessor: 'minimumSale',
    },
    {
      Header: 'Precio unitario',
      accessor: 'unitPrice',
    },
    {
      Header: "Fecha",
      accessor: 'createdAt'
    }
  ]
  const columns2 = [

    {
      Header: 'Emisor',
      accessor: 'emisor',
      Cell: ({ row }) => (<Chip label={row.original.emisor?.name} color="primary" />)

    },
    {
      Header: 'Receptor',
      accessor: 'receptor',
      Cell: ({ row }) => (<Chip variant="outlined" label={row.original.receptor?.name} color="primary" />)

    },
    {
      Header: 'Mensaje',
      accessor: 'message',
    },
    {
      Header: 'Fecha',
      accessor: 'createdAt',
    }
  ]
 
  const onSelect = async (row, op) => {
    if (confirm("¿Está seguro de "+op+" la selección ") == true) {
      let dataFinal = []
      row.map((e) => {
        let obj = {
          id: e.original.id,
          statusId: op == "autorizar" ? 2 : 3,
          type: e.original.hasOwnProperty('unitPrice') ? 'product' : 'chat'
        }
        dataFinal.push(obj)
      })
      
      const data1 = await autorizar({data:dataFinal}, usuario.token);
      mostrarNotificacion({ type: data1.status, message: data1.message })
      console.log("AQUI")
      if(data1.status=="success"){
        consultarDatos({ type, processId: process});
      }
    }
  }


const obtenerProcesos = async () => {
  const data = await obtenerTodosAdmin(usuario.token)
  setProcesses(data)
}
return (
  <div>
    <Grid container spacing={2} >
      <Modal open={open} setOpen={setOpen} title={"industrias"} />
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography >Autorizaciones</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Tipo de registro</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue=""
            label={"Tipo de registro"}
            value={type}
            size="small"
            onChange={(e) => {
              setProcess('')
              setType(e.target.value)
              if (e.target.value == "producto") {
                consultarDatos({ type: "producto" })
              } else {
                obtenerProcesos()

              }
            }}
          >
            <MenuItem value={""}>Selecciona un tipo</MenuItem>
            <MenuItem value={'producto'}>Producto</MenuItem>
            <MenuItem value={'chat'}>Mensajes</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {
        type == "chat" && (
          <Grid item xs={12}>
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Proceso</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue=""
                size="small"
                label={"Proceso"}
                value={process}
                onChange={(e) => {
                  setProcess(e.target.value)
                  consultarDatos({ type: "chat", processId: e.target.value })
                }}
              >
                <MenuItem value={""}>Selecciona un proceso</MenuItem>
                {
                  processes.map((e) => (
                    <MenuItem value={e.id}>Proceso: {e.id} - {e.box.descriptionVentario}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
        )
      }

      <Grid item xs={12} >

        {( type == "producto" && process == "") && <TableSelect onSelect={onSelect} columns={columns} data={data} />}
        {(  type == "chat" && process != "") && <TableSelect onSelect={onSelect} columns={columns2} data={data} />}

        {
          (type == "chat" && process == "" || type == "") && (
            <Grid item xs={12} md={12} >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Lottie animationData={emptyLottie} loop={true} style={{ height: 250 }} />

              </div>
            </Grid>
          )
        }

      </Grid>
    </Grid>
  </div>
)
}

