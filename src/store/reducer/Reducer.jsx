import {
    CARGAR_USUARIO,
    LOGOUT,MOSTRAR_NOTIFICACION,MOSTRAR_LOADER,ACTIVAR_OSCURO, ENVIAR_PULSO
  } from "../actions/Actions";
  
  export default (state, action) => {
    switch (action.type) {
        case CARGAR_USUARIO:
            return { ...state, usuario: action.payload };
        case LOGOUT:
            return { ...state, usuario: null,};
        case MOSTRAR_NOTIFICACION:
            return { ...state, notificacion: action.payload ,};
        case MOSTRAR_LOADER:
            return { ...state, loader: action.payload ,};
        case ACTIVAR_OSCURO:
            return { ...state, darkMode: action.payload ,};
        case ENVIAR_PULSO:
            return { ...state, pulso: action.payload ,};
        default:
            return state;
    }
  };
  