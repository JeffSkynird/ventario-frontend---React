import React, { Fragment, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth';
import { Box, Breadcrumbs, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Select, Skeleton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { obtenerTipoProductos, obtenerTodos, obtenerTodosPagina } from '../../../services/api/products/products';
import { obtenerTodosFiltro } from '../../../services/api/regiones/regiones';
import { obtenerTodosFiltro as obtenerComunas } from '../../../services/api/comunas/comunas';
import { obtenerTodosFiltro as obtenerIndustrias } from '../../../services/api/industrias/industrias';
import ClearIcon from '@mui/icons-material/Clear';

import SearchIcon from '@mui/icons-material/Search';
export default function index() {
  const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
  const [selectedTag, setSelectedTag] = useState(0)
  const [page, setPage] = useState(1);
  const [filtersTemp, setFiltersTemp] = useState(null)
  const [filters, setFilters] = useState(null)
  const { isLoading, isError, data, error, refetch, } = useQuery(['getAll', usuario.token, page, filters], obtenerTodosPagina)
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [regionData, setRegionData] = useState([]);
  const [comuna, setComuna] = useState('')
  const [comunaData, setComunaData] = useState([]);
  const [type, setType] = useState('')
  const [typeData, setTypeData] = useState([]);

  const [industry, setIndustry] = useState('')
  const [industryData, setIndustryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data1 = await obtenerTipoProductos(usuario.token)
      const data2 = await obtenerTodosFiltro(usuario.token)
      const data3 = await obtenerComunas(usuario.token);
      const data4 = await obtenerIndustrias(usuario.token);

      setRegionData(data2)
      setComunaData(data3)
      setTypeData(data1)
      setIndustryData(data4)
    }
    fetchData()

  }, [])
  const style = {
    container: {
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
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
  const handleChange = (event, value) => {
    setPage(value);
  };
  const search = () => {
    console.log(filtersTemp)
    setFilters(filtersTemp)
  }
  const handleSearch = (typeFilter, value) => {
    let temp
    if (typeFilter == "name") {
      temp = { ...filtersTemp, name: value }
    } else if (typeFilter == "region") {
      temp = { ...filtersTemp, region: value }
    } else if (typeFilter == "comuna") {
      temp = { ...filtersTemp, comuna: value }
    } else if (typeFilter == "industry") {
      temp = { ...filtersTemp, industry: value }
    } else if (typeFilter == "type") {
      temp = { ...filtersTemp, type: value }
    } else if (typeFilter == "reset") {
      temp = null
      setType('')
      setComuna('')
      setRegion('')
      setIndustry('')
      setName('')
      setFilters(null)
      setFiltersTemp(null)
    }
    if (temp) {
      setFiltersTemp(temp)
    }
  }
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{fontWeight:'bold'}} >Buscador</Typography>
          <div>
            {
              filters && (
                <IconButton onClick={(e) => { handleSearch('reset', null) }}
                >
                  <ClearIcon />
                </IconButton>
              )
            }

            <IconButton onClick={search}
            >
              <SearchIcon />
            </IconButton>
          </div>

        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <TextField
                variant="outlined"
                label="Buscador"
                sx={{ width: '100%' }}
                name="Buscador"
                value={name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    search()
                  }
                }}
                onChange={(e) => {
                  setName(e.target.value)
                  handleSearch('name', e.target.value)
                }
                }
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Región</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Región"}
                  onChange={(e) => {
                    setRegion(e.target.value)
                    handleSearch('region', e.target.value)
                  }}
                  value={region}
                >
                  <MenuItem value={""}>Selecciona una región</MenuItem>
                  {
                    regionData.map((e) => (
                      <MenuItem value={e.id}>{e.region}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Comuna</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Comuna"}
                  onChange={(e) => {
                    setComuna(e.target.value)
                    handleSearch('comuna', e.target.value)
                  }}
                  value={comuna}
                >
                  <MenuItem value={""}>Selecciona una comuna</MenuItem>
                  {
                    comunaData.map((e) => (
                      <MenuItem value={e.id}>{e.comuna}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Tipo de producto</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Tipo de producto"}
                  onChange={(e) => {
                    setType(e.target.value)
                    handleSearch('type', e.target.value)
                  }}
                  value={type}
                >
                  <MenuItem value={""}>Selecciona un tipo</MenuItem>
                  {
                    typeData.map((e) => (
                      <MenuItem value={e.id}>{e.type}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Industria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  label={"Industria"}
                  onChange={(e) => {
                    setIndustry(e.target.value)
                    handleSearch('industry', e.target.value)
                  }}
                  value={industry}
                >
                  <MenuItem value={""}>Selecciona una industria</MenuItem>
                  {
                    industryData.map((e) => (
                      <MenuItem value={e.id}>{e.industry}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} >
          {isLoading && (
            <Grid container spacing={1}>
              <Grid item xs={4}>

                <Skeleton height={100} />
              </Grid>
              <Grid item xs={4}>

                <Skeleton height={100} />
              </Grid>
              <Grid item xs={4}>

                <Skeleton height={100} />
              </Grid>
            </Grid>
          )}
          {!isLoading && (
            <Grid container spacing={1}>

              {
                data?.data.map((item, index) => (
                  <Grid item xs={12} md={4}>
                    <div style={style.container} onClick={() => navigate('/buscador/' + item.id, { state:{item,isNew:true}})}>
                      <div style={{ display: 'flex' }}>
                        <div style={style.imageContainer}>
                          <img style={{ height: '100px', width: '100px' }} src={item.image} alt="" />
                        </div>
                        <div style={style.detailsContainer}>
                          <b style={style.title}>{item.name}</b><br />
                          <span>{item.averageGrade} ★★★★☆ (36)</span><br />
                          <span >Arica Tarapacá</span><br />
                          <span>Tipo Uno</span><br />
                          <span style={{ opacity: 0.8 }}>{item.totalUnits} unidades</span><br />
                          <span style={{ opacity: 0.8 }}>Venta mínima de {item.minimumSale} unidades</span><br />
                        </div>
                      </div>

                    </div>
                  </Grid>

                )
                )}
            </Grid>
          )}
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <Pagination count={data?.totalPages} page={page} onChange={handleChange} />

          </Grid>

        </Grid>
      </Grid>
    </div>
  )
}

