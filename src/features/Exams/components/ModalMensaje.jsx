import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { asignarTag, crear } from '../../../services/api/tags/tags';
import { useAuth } from '../../../hooks/useAuth';
import { Box, Checkbox, Chip, FormControlLabel, TextField, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const { open, setOpen } = props;
    const [name, setName] = React.useState('');
    const [isComplete, setIscomplete] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIscomplete(false)
        setOpen(false);
    };
    const crearTag = async () => {
        mostrarLoader(true)
        const tiempoEspera = 1000;
        setTimeout(() => {
            if (isComplete == false) {
                setIscomplete(true)
            }

            mostrarLoader(false)
        }, tiempoEspera);

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
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{!isComplete ? "Enviar mensaje" : "Mensaje enviado"}</DialogTitle>
                <DialogContent>
                    {
                        !isComplete && (
                            <>
                                <DialogContentText id="alert-dialog-slide-description">
                                Recuerda que no puedes enviar informaciön que
revele identidad de la empresa. El incumplimiento de
esto estarå sujeto a sanciones de acuerdo al contrato.                                </DialogContentText>

                                <TextField
                                        variant="outlined"
                                        label="Escribir mensaje..."
                                        sx={{ width: '100%' ,marginTop:1}}
                                        name="email"
                                        multiline={true}
                                        rows={3}
                                    />
                                </>
                                )
                    }
                                {
                                    isComplete && (
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Lorem ipsum dolor sit amet consectetur adipiscing elit mus, massa convallis ac hendrerit malesuada non primis, laoreet aliquet et feugiat senectus accumsan conubia. Quis sem felis vivamus torquent auctor pulvinar pretium luctus eu risus tristique, fringilla facilisis curabitur natoque gravida vulputate primis feugiat dictumst
                                        </DialogContentText>
                                    )
                                }
                            </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>
                        <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag}>Enviar</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}
