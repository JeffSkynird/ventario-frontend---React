import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {  crear } from '../../../../services/api/comunas/comunas';
import { useAuth } from '../../../../hooks/useAuth';
import { Autocomplete, Box, Chip, TextField, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const [name, setName] = React.useState('');
 
    React.useEffect(() => {
        if (props.open.visible&&props.open.item!=null) {
            setName(props.open.item[props.title])
        }
    }, [props.open.visible])
    const handleClose = () => {
        setName('')
        props.setOpen({...props.open,visible:false});
    };
    const crearComuna = async () => {
        setName('')
        props.confirm(name,props.open.item!=null?props.open.item.id:null);
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
            <DialogTitle>{props.open.item!=null?"Actualizar":"Crear"} {props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Registre los datos
                </DialogContentText>
                <TextField
                    sx={{ width: '100%',marginTop:2 }}
                    label="Nombre"
                    variant='outlined'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={crearComuna}>{props.open.item!=null?"Actualizar":"Crear"}</Button>
            </DialogActions>
        </Dialog>
    );
}
