import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '../../../components/table/Table'
import { Box, Breadcrumbs, Button, Chip, Grid, IconButton, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { obtenerPdf, obtenerPorTag, obtenerTodos } from '../../../services/api/generations/generations';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
//import Modal from './components/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { crear, eliminar, eliminarPorGeneracion, obtenerTodos as obtenerTags } from '../../../services/api/tags/tags';
import Comunas from './components/Comunas'
import Regiones from './components/Regiones'
import Industrias from './components/Industrias'
import Restricciones from './components/Restricciones'
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
} export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getResults', usuario.token, selectedTag], obtenerTodos)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const [tags, setTags] = useState([])

  React.useEffect(() => {
    obtenerLista()
  }, [])
  const eliminarRegistro = async (id) => {
    mostrarLoader(true)
    const data1 = await eliminar(id, usuario.token)
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
    const data1 = await eliminarPorGeneracion(id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion(data1)
    refetch()
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
      Header: 'Email',
      accessor: 'tag',
      Cell: ({ row }) => (<Chip label={row.original.tag} color="primary" />)

    },
    {
      Header: 'Celular',
      accessor: 'status',
    },
    {
      Header: 'Dirección',
      accessor: 'estado',
    },
    {
      Header: 'Status',
      accessor: 'statuss',
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
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography >Configuraciones</Typography>

        </Grid>

        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Comunas" />
              <Tab label="Regiones" />
              <Tab label="Industrias" />
              <Tab label="Restricciones" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Comunas />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Regiones />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Industrias />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Restricciones />
          </CustomTabPanel>
        </Grid>
      </Grid>
    </div>
  )
}

