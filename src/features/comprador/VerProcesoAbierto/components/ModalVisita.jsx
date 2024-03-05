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
import { getLastOfferById } from '../../../../helpers/General';
import { editarEstadoVisita } from '../../../../services/api/processes/processes';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const { open, setOpen,item } = props;
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
    const crearTag = async (statusId,type) => {
        mostrarLoader(true)
        let obj = {
            "id": getLastOfferById(item.visits).id,
            "statusId": statusId
        }
        let data1 = await editarEstadoVisita(obj, usuario.token)
        mostrarLoader(false)
        mostrarNotificacion({ type: data1.status, message: data1.message })
        if (data1.status == 'success') {
            setIscomplete(true)
            if(type=="confirmar"){
                setIsConfirm(true)
            }else{
                setIsConfirm(false)
            
            }
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

                <DialogTitle>Fecha de propuesta de visita</DialogTitle>

                <DialogContent>
                    {
                        !isComplete && (
                            <>
                                <DialogContentText style={{ display: props.isEdited ? "none" : 'inline' }} id="alert-dialog-slide-description">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit mus Lorem ipsum dolor sit amet consectetur adipiscing elit mus
                                </DialogContentText><table border="1" style={{ marginTop: 10, width: '100%' }}>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                    </tr>
                                    <tr>
                                        <td align='center'>
                                            <TextField variant="standard" disabled   value={getLastOfferById(item.visits)?.date}/>
                                        </td>
                                        <td align='center'>
                                            <TextField variant="standard" disabled value={getLastOfferById(item.visits)?.schedule?.schedule}/>

                                        </td>
                                    </tr>
                                </table>
                            </>
                        )
                    }
                    {
                        isComplete && isConfirm && (
                            <DialogContentText id="alert-dialog-slide-description">
                                Visita confirmada                                  </DialogContentText>
                        )
                    }
                    {

                        isComplete && !isConfirm&&(
                            <DialogContentText id="alert-dialog-slide-description">
                                La fecha y hora fue rechaza, por favor ponte de
                                acuerdo via mensajeria e ingresa la fecha y
                                hora acordada porque una vez que se acepte
                                se informarán los datos de la contraparte.    </DialogContentText>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose}>Cerrar</Button>
                    <Button color='error' style={{ display: isComplete ? 'none' : 'inline' }} onClick={()=>crearTag(5,"rechazar")}>Rechazar</Button>
                    <Button color='secondary' style={{ display: isComplete ? 'none' : 'inline' }} onClick={()=>crearTag(2,"confirmar")}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
