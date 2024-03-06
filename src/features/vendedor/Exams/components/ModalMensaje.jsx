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
import { Box, Checkbox, Chip, FormControlLabel, TextField, Typography } from '@mui/material';
import { sendClientMessage } from '../../../../services/api/chats/chats';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const { open, setOpen,item } = props;
    const [message, setMessage] = React.useState('');
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
        let obj = {
            "emisorId":usuario.user.id,
            "receptorId":item.userid,
            "typeId":2,
            "message":message,
            "processId":null,
            "boxId":item.boxid
        }
        const data1 = await sendClientMessage(obj, usuario.token)
        mostrarLoader(false)
        mostrarNotificacion({ type: data1.status, message: data1.message })
        if (data1.status == 'success') {
            setIscomplete(true)
            window.location.href = '/buscador/'+data1.data.processId
        }
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
                                Puedes solicitar  información de los productos pero no puedes enviar información que revele identidades. Recuerda que esto no está permitido según clausula contractual.                               </DialogContentText>

                                <TextField
                                        variant="outlined"
                                        label="Escribir mensaje..."
                                        sx={{ width: '100%' ,marginTop:1}}
                                        name="email"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        multiline={true}
                                        rows={3}
                                    />
                                </>
                                )
                    }
                                {
                                    isComplete && (
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Mensaje enviado
                                        </DialogContentText>
                                    )
                                }
                            </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>
                        <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag} disabled={message==""}>Enviar</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}
