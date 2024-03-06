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
import { crearOferta, editarOferta } from '../../../../services/api/processes/processes';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { mostrarNotificacion, cargarUsuario, mostrarLoader, usuario } = useAuth();
    const navigate = useNavigate();

    const { open, setOpen,item } = props;
    const [name, setName] = React.useState('');
    const [isComplete, setIscomplete] = React.useState(false)
    const [offer,setOffer] = React.useState('')
    const [offerData,setOfferData] = React.useState(null)

    React.useEffect(() => {
        if(props.isEdited){
            console.log("CACA")
            console.log(item)
            setOfferData(item.box?.product)
            setOffer(getLastOfferById(item.offers)?.quantity)
        }else{
            console.log("COCA")
            setOfferData(item)
        }
    }, [props.isEdited])
    const handleClickOpen = () => {
        setOpen(true);
    };
    const getLastOfferById = (offers) => {
        offers.sort((a, b) => (a.id > b.id) ? 1 : -1)
        return offers[offers.length-1]
      }
    const handleClose = () => {
        setIscomplete(false)
        if(!props.isEdited){
            setOffer('')
        }
        setOpen(false);
    };
    const crearTag = async () => {
        mostrarLoader(true)
        let data1
        if(props.isEdited){
            if(item.offers.length!=0){
                let obj = {
                    "id":getLastOfferById(item.offers).id,
                    "quantity":offer,
                    "price":offerData.unitPrice,
                    "total":(offer) * Number(offerData.unitPrice),
                }
                 data1 = await editarOferta(obj, usuario.token)
            }else{
                let obj = {
                    "quantity":offer,
                    "price":offerData.unitPrice,
                    "total":(offer) * Number(offerData.unitPrice),
                    "statusId":1,
                    "processId":item.id
                }
                 data1 = await crearOferta(obj, usuario.token)
            }
        }else{
            let obj = {
                "quantity":offer,
                "price":offerData.unitPrice,
                "total":(offer) * Number(offerData.unitPrice),
                "statusId":1,
                "processId":null,
                'boxId':offerData.boxid,
                "clientId":usuario.user.id
            }
             data1 = await crearOferta(obj, usuario.token)
        }
        mostrarLoader(false)
        mostrarNotificacion({ type: data1.status, message: data1.message })
        if(data1.status == 'success'){
            setIscomplete(true)
            if(!props.isEdited){
                //navigate('/buscador/'+data1.data.processId,{state:{item: null,isNew:false}})
                window.location.href = '/buscador/'+data1.data.processId
            }else{
                props.refresh()
            }
        }
    }

    const confirm = async (id) => {
        mostrarLoader(true)
        let obj = {
            "quantity":offer,
            "price":offerData.unitPrice,
            "total":(offer) * Number(offerData.unitPrice),
            "statusId":1,
            "processId":null,
        }
        const data1 = await crearOferta(obj, usuario.token)
        mostrarLoader(false)
        mostrarNotificacion({ type: data1.status, message: data1.message })
        if(data1.type == 'success'){
            handleClose()
        }
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
                        <DialogTitle>{!isComplete ? "Oferta" : "Oferta"}</DialogTitle>
                    )
                }
                <DialogContent>
                    {
                        !isComplete && (
                            <><DialogContentText style={{ display: props.isEdited ? "none" : 'inline' }} id="alert-dialog-slide-description">
                                El vendedor tendrá un límite de 72 horas para indicar aceptación o rechazo de la propuesta. En caso de no responder en este plazo se considerará como rechazo.
                            </DialogContentText>
                            <table border="1" style={{ width: '100%' }}>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Precio Neto</th>
                                        <th>Total Neto</th>
                                    </tr>
                                    <tr>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={offer}
                                                onChange={(e) => setOffer(e.target.value)}
                                            />
                                        </td>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={offerData?.unitPrice}
                                                disabled
                                            />
                                        </td>
                                        <td align='center'>
                                            <TextField
                                                variant="standard"
                                                value={(offer) * Number(offerData?.unitPrice)}
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                </table><FormControlLabel style={{ display: props.isEdited ? "none" : 'inline' }} control={<Checkbox />} label="Sujeto a visita de inspeccion" /></>
                        )
                    }
                    {
                        isComplete && (
                            <DialogContentText id="alert-dialog-slide-description">
                                {!props.isEdited ? "Oferta Enviada" : "Cambios guardados"}
                            </DialogContentText>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    {
                        !props.isEdited && (
                            <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag} disabled={offer==''}>Generar oferta</Button>
                        )
                    }
                    {
                        props.isEdited && (
                            <Button style={{ display: isComplete ? 'none' : 'inline' }} onClick={crearTag} disabled={offer==''}>Guardar cambios</Button>
                        )
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
