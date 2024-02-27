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
import { Autocomplete, Box, Chip, TextField, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const [name, setName] = React.useState('');
 
    const handleClose = () => {
        props.setOpen(false);
    };
    const crearTag = async () => {
        mostrarLoader(true)
        const obj = {
            "name": name,
            "generation_id": props.generation_id
        }
        const data1 = await crear(obj, usuario.token)
        mostrarLoader(false)
        mostrarNotificacion(data1)
        props.obtenerLista()
        props.refetch()
        handleClose()
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
        props.obtenerLista()
        props.refetch()
        handleClose()

    }
    const top100Films = [
        { label: 'Producto 1', description: 'Descripcion' },
        { label: 'Producto 2', description: 'Descripcion2' },
    ]
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
           maxWidth="sm"
           fullWidth={true}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Agregar "}{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Registre los datos
                </DialogContentText>
                <TextField
                  id=""
                  sx={{ width: '100%',marginTop:2 }}
                  label="Nombre"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleClose}>Agregar</Button>
            </DialogActions>
        </Dialog>
    );
}
