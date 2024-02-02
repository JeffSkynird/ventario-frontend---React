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
                    !props.isEdited && (
                        <DialogTitle>{!isComplete ? "Agendar visita" : "Fecha enviada"}</DialogTitle>
                        )
                }
                 {
                    props.isEdited && (
                        <DialogTitle>{!isComplete ? "Editar visita" : "Visita editada"}</DialogTitle>
                    )
                }
                <DialogContent>
                    {
                        !isComplete && (
                            <>
                                <DialogContentText style={{display: props.isEdited?"none":'inline'}}  id="alert-dialog-slide-description">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit mus Lorem ipsum dolor sit amet consectetur adipiscing elit mus
                                </DialogContentText><table border="1" style={{ marginTop:10,width: '100%' }}>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                    </tr>
                                    <tr>
                                        <td align='center'>
                                            <TextField variant="standard" type="date" name="" id="" />
                                        </td>
                                        <td align='center'>
                                        <TextField variant="standard" type="time" name="" id="" />

                                        </td>
                                    </tr>
                                    </table>
                                </>
                                )
                    }
                                {
                                    isComplete && (
                                        <DialogContentText id="alert-dialog-slide-description">
  { !props.isEdited? "Lorem ipsum dolor sit amet consectetur adipiscing elit mus, massa convallis ac hendrerit malesuada non primis, laoreet aliquet et feugiat senectus accumsan conubia. Quis sem felis vivamus torquent auctor pulvinar pretium luctus eu risus tristique, fringilla facilisis curabitur natoque gravida vulputate primis feugiat dictumst":"Cambios guardados"}                                        </DialogContentText>
                                    )
                                }
                            </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>
                        {
                    !props.isEdited && (
                        <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag}>Agendar</Button>
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
