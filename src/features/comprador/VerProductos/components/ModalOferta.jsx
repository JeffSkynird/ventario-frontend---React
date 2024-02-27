import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { asignarTag, crear } from '../../../../services/api/tags/tags';
import { useAuth } from '../../../../hooks/useAuth';
import { Box, Checkbox, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const { open, setOpen } = props;
    const [name, setName] = React.useState('');
    const [isComplete, setIscomplete] = React.useState(false)
    const [confirm, setConfirm] = React.useState(false)
    const [motivo, setMotivo] = React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIscomplete(false)
        setOpen(false);
        setConfirm(false)
    };
    const crearTag = async () => {
        mostrarLoader(true)
        const tiempoEspera = 1000;
        setTimeout(() => {
            if (isComplete == false) {
                setIscomplete(true)
                setMotivo("")
            }
            mostrarLoader(false)
        }, tiempoEspera);
     
    }
    const confirmarEliminar = () => {
        setConfirm(true)
    }
    const asignar = async (id) => {
        mostrarLoader(true)
        let obj = {
            "tag_id": id,
            "generation_id": props.generation_id
        }
        const data1 = await asignarTag(obj, usuario.token)
        mostrarLoader(false)
        mostrarNotificacion(data1)

        handleClose()
    }
    const handleChange = (event) => {
        setMotivo(event.target.value);
    };
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>Eliminación de producto</DialogTitle>

                <DialogContent>
                    {
                        !isComplete && !confirm && (
                            <DialogContentText id="alert-dialog-slide-description">
                                ¿Desea eliminar este producto?
                            </DialogContentText>
                        )
                    }
                    {
                        !isComplete && confirm && (
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Ingrese el motivo</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    value={motivo}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="0" control={<Radio />} label="Producto en mal estado" />
                                    <FormControlLabel value="1" control={<Radio />} label="Producto vendido" />
                                    <FormControlLabel value="2" control={<Radio />} label="Error en el inventario" />
                                    <FormControlLabel value="3" control={<Radio />} label="Otro" />

                                </RadioGroup>
                            </FormControl>
                        )
                    }
                    {
                        motivo == 3 && (
                            <TextField
                                multiline
                                sx={{ width: '100%', mt: 1 }}
                                rows={3}
                                placeholder={'Escribir mensaje'}
                            />
                        )
                    }

                    {
                        isComplete && (
                            <DialogContentText id="alert-dialog-slide-description">
                                Producto eliminado
                            </DialogContentText>
                        )
                    }


                </DialogContent>
                <DialogActions>
            
        <Button style={{ display: isComplete ? 'inline' : 'none' }} onClick={handleClose}>Cerrar</Button>
                    <Button style={{ display: !confirm ? 'inline' : 'none' }} onClick={handleClose}>No</Button>
                    <Button color="error" style={{ display: !confirm ? 'inline' : 'none' }} onClick={confirmarEliminar}>Sí</Button>
                    <Button color="error" style={{ display: confirm&&!isComplete ? 'inline' : 'none' }} onClick={crearTag}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
