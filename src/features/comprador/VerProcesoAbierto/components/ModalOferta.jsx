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
import { editarEstadoOferta } from '../../../../services/api/processes/processes';
import { getLastOfferById } from '../../../../helpers/General';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const { open, setOpen ,item} = props;
    const [name, setName] = React.useState('');
    const [isComplete, setIscomplete] = React.useState(false)
    const [isConfirm, setIsConfirm] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIscomplete(false)
        setOpen(false);
    };
    const crearTag = async (statusId) => {
        mostrarLoader(true)
        let obj = {
            "id": getLastOfferById(item.offers).id,
            "statusId": statusId
        }
        let data1 = await editarEstadoOferta(obj, usuario.token)
        mostrarLoader(false)
        mostrarNotificacion({ type: data1.status, message: data1.message })
        if (data1.status == 'success') {
            setIscomplete(true)
            setIsConfirm(true)
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
    const rechazar = () => {
        setOpen(false)
        setIscomplete(false)
        setIsConfirm(false)
    }
    const rechazarConfirm = () => {
        setIsConfirm(false)
        setIscomplete(true)

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

                <DialogTitle>Oferta recibida</DialogTitle>

                <DialogContent>
                    {
                        !isComplete && (
                            <><DialogContentText style={{ display: props.isEdited ? "none" : 'inline' }} id="alert-dialog-slide-description">
                                EI Vendedor tendrá un limite de tiempo de 48 horas
                                para confirmar si rechaza o acepta. En caso de
                                sobrepasar este tiempo se considerará rechazado.
                            </DialogContentText><table border="1" style={{ width: '100%' }}>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Precio Neto</th>
                                        <th>Total Neto</th>
                                    </tr>
                                    <tr>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={getLastOfferById(item.offers)?.quantity}
                                                disabled
                                            />
                                        </td>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={getLastOfferById(item.offers)?.price}
                                                disabled
                                            />
                                        </td>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={getLastOfferById(item.offers)?.total}
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                </table><FormControlLabel style={{ display: props.isEdited ? "none" : 'inline' }} control={<Checkbox />} label="Sujeto a visita de inspeccion" /></>
                        )
                    }
                    {
                        isComplete && isConfirm && (
                            <DialogContentText id="alert-dialog-slide-description">
                                Oferta confirmada
                            </DialogContentText>
                        )
                    }
                    {
                        isComplete && !isConfirm && (
                            <React.Fragment>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Indicanos por favor el motivo del rechazo

                                </DialogContentText>
                                <TextField
                                    multiline
                                    sx={{ width: '100%', mt: 1 }}
                                    rows={4}
                                    placeholder={'Escribir un mensaje'}
                                />
                            </React.Fragment>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button style={{ display: isComplete && !isConfirm ? 'none' : 'inline' }} onClick={handleClose}>Cerrar</Button>
                    <Button color='error' style={{ display: isComplete ? 'none' : 'inline' }} onClick={rechazarConfirm}>Rechazar</Button>
                    <Button color='secondary' style={{ display: isComplete ? 'none' : 'inline' }} onClick={()=>crearTag(2)}>Confirmar</Button>
                    <Button color='error' style={{ display: isComplete && !isConfirm ? 'inline' : 'none' }} onClick={()=>crearTag(5)}>Rechazar</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
