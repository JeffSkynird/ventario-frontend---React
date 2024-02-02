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
import { Box, Chip, TextField, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
    return (
        <div>
            <Chip label={"Ninguno"} variant="outlined" onClick={handleClickOpen} />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Asigna un tag"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Mediante los tags puedes filtrar tus resultados para poder verlos de una manera mas organizada
                    </DialogContentText>
                    {
                        props.tags.length != 0 && (
                            <Box>

                                <Typography variant="subtitle2" sx={{ marginTop: '5px', marginBottom: '5px' }}  >Asigna un tag existente</Typography>

                                {
                                    props.tags.map((tag) => (
                                        <Chip key={tag.id} label={tag.name} onClick={() => asignar(tag.id)} sx={{ marginRight: '5px', marginBottom: '5px' }} />
                                    ))
                                }
                            </Box>
                        )
                    }
                    <Typography sx={{ marginTop: '5px', marginBottom: '5px' }} variant="subtitle2" >Asigna un nuevo tag</Typography>

                    <TextField
                        autoFocus
                        label="Nuevo tag"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={crearTag}>Crear</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
