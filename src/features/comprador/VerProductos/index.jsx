import React, { Fragment, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Avatar, Box, Breadcrumbs, Button, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Skeleton, Switch, Tab, Tabs, TextField, Typography } from '@mui/material';
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
import { obtenerTodosFiltro } from '../../../services/api/bodegas/bodegas';
import { obtenerTodosFiltro as obtenerIndustrias } from '../../../services/api/industrias/industrias'
import { editar, eliminar } from '../../../services/api/products/products';
import { storage } from '../../../../firebase'; // Ruta a tu archivo firebase.js

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
  const [images, setImages] = React.useState([]);
  const [imagesRaw, setImagesRaw] = React.useState([]);

  const [bodega, setBodega] = React.useState('');
  const [bodegas, setBodegas] = React.useState([]);
  const [codigoEmpresa, setCodigoEmpresa] = React.useState('');
  const [codigoVentario, setCodigoVentario] = React.useState('');
  const [descripcionItem, setDescripcionItem] = React.useState('');
  const [unidadesTotales, setUnidadesTotales] = React.useState('');
  const [armado, setArmado] = React.useState('');
  const [porArmar, setPorArmar] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const [ventaMinima, setVentaMinima] = React.useState('');
  const [resticcion, setRestriccion] = React.useState('');

  const [industria, setIndustria] = React.useState('');
  const [industriaData, setIndustriaData] = React.useState([]);
  React.useEffect(() => {
    if (state.item) {
      setBodega(state.item.boxes[0]?.bodega?.id)
      setCodigoEmpresa(state.item.codEmp)
      setCodigoVentario(state.item.codVentario)
      setDescripcionItem(state.item.description)
      setUnidadesTotales(state.item.totalUnits)
      setArmado(state.item.boxes[0]?.armado)
      setPorArmar(state.item.boxes[0]?.porArmar)
      setPrecio(state.item.unitPrice)
      setVentaMinima(state.item.minimumSale)
      setRestriccion(state.item.restriction)
      setIndustria(state.item.industryId)
      setImages(state.item.boxes[0]?.boxImages)
      async function fetching() {
        const data = await obtenerTodosFiltro(usuario.token)
        const data2 = await obtenerIndustrias(usuario.token)
        setBodegas(data)
        setIndustriaData(data2)
      }
      fetching()
    }
  }, [])
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

  const handleSubmit = async () => {
    //SUBIR IMAGENES
    mostrarLoader(true)
    let imagesTemp = [...images];
    await Promise.all(imagesTemp.map(async (e) => {
      if (e.raw) {
        let url = await handleFileUpload(e.raw);
        if (url) {
          e.url = url;
        }
      }
    }));
    let obj = {
      "id": state.item.id,
      "codEmp": codigoEmpresa,
      "codVentario": codigoVentario,
      "name": state.item.name,
      "description": descripcionItem,
      "totalUnits": unidadesTotales,
      "unitPrice": precio,
      "minimumSale": ventaMinima,
      "restriction": resticcion,
      "industryId": industria,
      "box":
      {
        "boxId": state.item.boxes[0]?.id,
        "bodegaId": bodega,
        "armado": armado,
        "porArmar": porArmar,
        "boxImages": imagesTemp
      }
    }
    const dt = await editar(obj, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion({ type: dt.status, message: dt.message })
    if (dt.status === 'success') {
      navigate('/productos')
    }
  }

  const handleCapture = (event) => {
    const files = Array.from(event.target.files);
    console.log(files)
    if (files.length > 0) {
      console.log("AQUI")
      let newImages = [...images]
      files.forEach((file) => {
        console.log(file)
        if (file) {
          //newImages = [...images, { url: URL.createObjectURL(file) }]
          newImages.push({ url: URL.createObjectURL(file), raw: file })

        }
      })
      setImages(newImages)
    }
  }
  const handleFileUpload = async (file) => {
    try {
      const storageRef = storage.ref();
      const boxesRef = storageRef.child('/Boxes'); // Ruta de la carpeta "Boxes"
      const fileRef = boxesRef.child(file.name); // Referencia al archivo en la carpeta "Boxes"
      await fileRef.put(file);
      console.log("Archivo subido exitosamente");
      // Obtener la URL del archivo guardado
      const url = await fileRef.getDownloadURL();
      console.log("URL del archivo:", url);
      return url;
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      return null;
    }
  };
  const deleteImage = (index) => {
    let newImages = images.filter((e, i) => i !== index)
    setImages(newImages)
  }

  const deleteProduct = async () => {
    mostrarLoader(true)
    const dt = await eliminar(state.item.id, usuario.token)
    mostrarLoader(false)
    mostrarNotificacion({ type: dt.status, message: dt.message })
    if (dt.status === 'success') {
      navigate('/productos')
    }
  }
  return (
    <Grid container spacing={2} >
      <Modal open={open} setOpen={setOpen} />
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
            onClick={deleteProduct}
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
          <InputLabel id="demo-simple-select-label">Bodega</InputLabel>
          <Select
            defaultValue=""
            label={"Bodega"}
            value={bodega}
            onChange={(e) => setBodega(e.target.value)}
          >
            <MenuItem value={""}>Selecciona una bodega</MenuItem>
            {bodegas.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.address}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Código empresa"
          sx={{ width: '100%' }}
          value={codigoEmpresa}
          onChange={(e) => setCodigoEmpresa(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Código Ventario"
          sx={{ width: '100%' }}
          value={codigoVentario}
          onChange={(e) => setCodigoVentario(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Descripción Item"
          sx={{ width: '100%' }}
          value={descripcionItem}
          onChange={(e) => setDescripcionItem(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Unidades totales"
          sx={{ width: '100%' }}
          value={unidadesTotales}
          onChange={(e) => setUnidadesTotales(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Armado"
          sx={{ width: '100%' }}
          value={armado}
          onChange={(e) => setArmado(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Por armar"
          sx={{ width: '100%' }}
          value={porArmar}
          onChange={(e) => setPorArmar(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Precio"
          sx={{ width: '100%' }}
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Imágen</FormLabel>
                  <FormGroup aria-label="position" row>
                    <Button style={{ marginTop: 10, marginBottom: 10, borderRadius: 9 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                      Subir archivo
                      <input style={{ visibility: 'hidden', whiteSpace: 'nowrap', width: 0, overflow: 'hidden', }} onChange={handleCapture} type="file" name="" id="" multiple />
                    </Button>
                  </FormGroup>

                </FormControl>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* <img src={img} alt="" srcset="" style={{height:100,width:100,cursor:'pointer'}} onClick={openImageInNewTab}/> */}
            {
              images.map((e, index) => (
                <Avatar alt="img" src={e.url} onClick={() => deleteImage(index)} sx={{ cursor: 'pointer' }} />
              ))
            }
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Venta mínima"
          sx={{ width: '100%' }}
          name="ventaMinima"
          value={ventaMinima}
          onChange={(e) => setVentaMinima(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size='small'
          variant="outlined"
          label="Restriccion"
          sx={{ width: '100%' }}
          name="Restriccion"
          value={resticcion}
          onChange={(e) => setRestriccion(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Industria</InputLabel>
          <Select
            defaultValue=""
            label={"Industria"}
            value={industria}
            onChange={(e) => setIndustria(e.target.value)}
          >
            <MenuItem value={""}>Selecciona una industria</MenuItem>
            {industriaData.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.industry}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

    </Grid>
  )
}

