import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { crear } from '../../../../services/api/comunas/comunas';
import { useAuth } from '../../../../hooks/useAuth';
import { Autocomplete, Box, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { obtenerTodosFiltro } from '../../../../services/api/regiones/regiones';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const [name, setName] = React.useState('');
    const [region, setRegion] = React.useState('');
    const [regionData, setRegionData] = React.useState([]);
    React.useEffect(() => {
        if (props.open.visible) {
            if (props.open.item != null) {
                setName(props.open.item[props.title])
                setRegion(props.open.item.regione?.id)
            }
            async function fetchData() {
                const dat = await obtenerTodosFiltro(usuario.token)
                setRegionData(dat)
            }
            fetchData()
        }
    }, [props.open.visible])
    const handleClose = () => {
        setName('')
        props.setOpen({ ...props.open, visible: false });
    };
    const crearComuna = async () => {
        setName('')
        props.confirm({name,id:props.open.item != null ? props.open.item.id : null,regionId:region});
    }

    return (
        <Dialog
            open={props.open.visible}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="sm"
            fullWidth={true}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{props.open.item != null ? "Actualizar" : "Crear"} {props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Registre los datos
                </DialogContentText>
                <TextField
                    sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                    label="Nombre"
                    variant='outlined'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Región</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=""
                        label={"Región"}
                        value={region}
                        onChange={(e) => {
                            setRegion(e.target.value)
                        }}
                    >
                        <MenuItem value={""}>Selecciona una región</MenuItem>
                        {
                            regionData.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.region}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={crearComuna}>{props.open.item != null ? "Actualizar" : "Crear"}</Button>
            </DialogActions>
        </Dialog>
    );
}
