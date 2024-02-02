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
                {
                    props.isEdited && (
                        <DialogTitle>{!isComplete ? "Editar oferta" : "Oferta editada"}</DialogTitle>
                    )
                }
                {
                    !props.isEdited && (
                        <DialogTitle>{!isComplete ? "Oferta" : "Oferta enviada"}</DialogTitle>
                    )
                }
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
                                                value={44}
                                            />
                                        </td>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={'$5.000'}
                                            />
                                        </td>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={'$220.000'}
                                            />
                                        </td>
                                    </tr>
                                </table><FormControlLabel style={{ display: props.isEdited ? "none" : 'inline' }} control={<Checkbox />} label="Sujeto a visita de inspeccion" /></>
                        )
                    }
                    {
                        isComplete && (
                            <DialogContentText id="alert-dialog-slide-description">
                                {!props.isEdited ? "Lorem ipsum dolor sit amet consectetur adipiscing elit mus, massa convallis ac hendrerit malesuada non primis, laoreet aliquet et feugiat senectus accumsan conubia. Quis sem felis vivamus torquent auctor pulvinar pretium luctus eu risus tristique, fringilla facilisis curabitur natoque gravida vulputate primis feugiat dictumst" : "Cambios guardados"}
                            </DialogContentText>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    {
                        !props.isEdited && (
                            <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag}>Generar oferta</Button>
                        )
                    }
                    {
                        props.isEdited && (
                            <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag}>Guardar cambios</Button>
                        )
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
