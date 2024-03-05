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
import { Box, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { crearVisita, editarVisita, obtenerHorarios } from '../../../../services/api/processes/processes';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();

    const { open, setOpen, item } = props;
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [time, setTime] = React.useState('');
    const [timeData, setTimeData] = React.useState([]);

    const [isComplete, setIscomplete] = React.useState(false)

    React.useEffect(() => {
        if(props.isEdited){
            setDate(getLastOfferById(item.visits)?.date)
            setTime(getLastOfferById(item.visits)?.schedulesId)
        }
    }, [props.isEdited])

    React.useEffect(() => {
        const getHorarios = async () => {
            const data = await obtenerHorarios(usuario.token)
            setTimeData(data)
        }
        getHorarios()
    }, [])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIscomplete(false)
        setOpen(false);
    };
    const formatDate = (date) => {
        try {
            let d = new Date(date)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let dt = d.getDate()

            if (dt < 10) {
                dt = '0' + dt
            }
            if (month < 10) {
                month = '0' + month
            }
            return year + '-' + month + '-' + dt

        } catch (e) {
            console.log(e)
        }

    }
    const crearTag = async () => {
        mostrarLoader(true)
        let data1
        if(props.isEdited){
            let obj = {
                "id":getLastOfferById(item.visits).id,
                "date": formatDate(date),
                "schedulesId": time
            }
             data1 = await editarVisita(obj, usuario.token)
        }else{
            let obj = {
                "date": formatDate(date),
                "inspection": "N/A",
                "schedulesId": time,
                "statusId": 1,
                "processId": null,
                'boxId': item.boxid,
                "clientId": usuario.user.id
            }
            const data1 = await crearVisita(obj, usuario.token)
        }
       
        mostrarLoader(false)
        mostrarNotificacion({ type: data1.status, message: data1.message })
        if (data1.status == 'success') {
            setIscomplete(true)

        }
    }
    const getLastOfferById = (offers) => {
        offers.sort((a, b) => (a.id > b.id) ? 1 : -1)
        return offers[offers.length-1]
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
                                <DialogContentText style={{ display: props.isEdited ? "none" : 'inline' }} id="alert-dialog-slide-description">
                                    Ingrese propuesta de día y hora de visita, el vendedor podrá aceptar o rechazar la fecha. La coordinación de nueva fecha en caso de rechazo debe hacerla por mensajería y volver a reagendar.
                                </DialogContentText><table border="1" style={{ marginTop: 10, width: '100%' }}>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                    </tr>
                                    <tr>
                                        <td align='center' style={{ padding: 5, width: '60%' }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} style={{ width: '100%' }} >
                                                <DatePicker
                                                    value={date}
                                                    onChange={(newValue) => {
                                                        setDate(newValue);
                                                    }}
                                                    name="date"
                                                    disablePast
                                                    style={{ width: '100%' }}
                                                    inputFormat="yyyy-MM-dd"
                                                    renderInput={(params) => <TextField variant='outlined' style={{ width: '100%' }}  {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </td>
                                        <td align='center' style={{ padding: 5, width: '40%' }}>
                                            <FormControl fullWidth >
                                                <InputLabel id="demo-simple-select-label">Horario</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                    label={"Horario"}
                                                >
                                                    <MenuItem value="">Selecciona un horario</MenuItem>
                                                    {timeData.map((e, index) => (
                                                        <MenuItem key={index} value={e.id}>
                                                            {e.schedule}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                        </td>
                                    </tr>
                                </table>
                            </>
                        )
                    }
                    {
                        isComplete && (
                            <DialogContentText id="alert-dialog-slide-description">
                                {!props.isEdited ? "Fecha de visita enviada" : "Cambios guardados"}                                        </DialogContentText>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    {
                        !props.isEdited && (
                            <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag} disabled={date==null||time==''}>Agendar</Button>
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
