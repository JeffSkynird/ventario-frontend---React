import React, { Fragment, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Button, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Skeleton, Switch, Tab, Tabs, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Modal from './components/ModalOferta'
import ModalVisita from './components/ModalVisita'
import ModalMensaje from './components/ModalMensaje'
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import Detail from './components/Detail'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function index(props) {
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  let { id } = useParams();

  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [img,setImg] =  React.useState(null);

  React.useEffect(()=>{
    if(state.item){
      console.log(state.item)
    }
  },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const breadcrumbs = [
    <Link
      underline="none"
      key="2"
      color="inherit"

    >
      Mis productos
    </Link>,
    <Typography key="3" color="text.primary">
      Producto 1
    </Typography>,
  ];
  const style = {
    container: {
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      height: '180px',
      overflowY: 'auto'
    },
    imageContainer: {
      color: '#fff',
      padding: '20px',
      borderRadius: '5px'
    },
    detailsContainer: {
      marginLeft: '10px'
    },
    title: {
      fontSize: '18px'
    }
  };

  const handleSubmit = () => {

  }
  const handleCapture = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado por el usuario

    if (file) {
      // Aquí puedes hacer algo con el archivo, como leer su contenido o enviarlo a un servidor
      console.log("Archivo seleccionado:", file);
      // También puedes establecer la imagen en el estado si es necesario
      setImg(URL.createObjectURL(file));
    }
  }
  const openImageInNewTab = () => {
    if (img) {
      window.open(img, '_blank');
    } 
  };
  return (
    <Grid container spacing={2} >
      <Modal  open={open} setOpen={setOpen} />
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumbs
          //separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<DeleteIcon />}
            onClick={()=>setOpen(true)}
            variant="outlined"
            color="error"
          >
            Eliminar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </Box>


      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
          <Select
            defaultValue=""
            label={"Empresa"}
          >
            <MenuItem value={""}>Selecciona una empresa</MenuItem>
            <MenuItem value={1}>Empresa 1</MenuItem>
            <MenuItem value={2}>Empresa 2</MenuItem>

          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Bodega</InputLabel>
          <Select
            defaultValue=""
            label={"Bodega"}
          >
            <MenuItem value={""}>Selecciona una bodega</MenuItem>
            <MenuItem value={1}>Bodega 1</MenuItem>
            <MenuItem value={2}>Bodega 2</MenuItem>

          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Código empresa"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Código Ventario"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Descripción Item"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Kilos"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Armado"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Por armar"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Precio"
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={10}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Oferta S/N</FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control={<Switch color="primary" />}
                      label="Sí"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Imágen</FormLabel>
                  <FormGroup aria-label="position" row>
                    <Button style={{ marginTop: 10, borderRadius: 9 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                      Subir archivo
                      <input style={{ visibility: 'hidden', whiteSpace: 'nowrap', width: 0, overflow: 'hidden', }} onChange={handleCapture} type="file" name="" id="" />
                    </Button>
                  </FormGroup>

                </FormControl>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sx={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
            <img src={img} alt="" srcset="" style={{height:100,width:100,cursor:'pointer'}} onClick={openImageInNewTab}/>
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Venta mínima"
          sx={{ width: '100%' }}
          name="description"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Restricción</InputLabel>
          <Select
            defaultValue=""
            label={"Restricción"}
          >
            <MenuItem value={""}>Selecciona una restricción</MenuItem>
            <MenuItem value={1}>Restricción 1 - Descripción</MenuItem>
            <MenuItem value={2}>Restricción 2 - Descripción 2</MenuItem>

          </Select>
        </FormControl>
      </Grid>


    </Grid>
  )
}

