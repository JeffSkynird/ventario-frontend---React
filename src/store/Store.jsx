import React, { useReducer } from "react";
import Initializer from "./Initializer";
import Reducer from "./reducer/Reducer";
import Propager from "./Propager";
import {
  CARGAR_USUARIO,
  LOGOUT,MOSTRAR_NOTIFICACION,MOSTRAR_LOADER,ACTIVAR_OSCURO,ENVIAR_PULSO
} from "./actions/Actions";
const Store = (props) => {

  const initialState = {
    usuario: null,notificacion:null,loader:false,darkMode:false,pulso:false
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const cargarUsuario = (usuario) => {
    dispatch({
      type: CARGAR_USUARIO,
      payload: usuario,
    });
  };
  const mostrarNotificacion = (data) => {
    dispatch({
      type: MOSTRAR_NOTIFICACION,
      payload: data,
    });
  };
  const mostrarLoader = (data) => {
    dispatch({
      type: MOSTRAR_LOADER,
      payload: data,
    });
  };
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  const activarOscuro = (data) => {
    dispatch({
      type: ACTIVAR_OSCURO,
      payload: data,
    });
  }

 const enviarPulso = (data) => {
    dispatch({
      type: ENVIAR_PULSO,
      payload: data,
    });
  }
  return (
    <Initializer.Provider
      value={{
        darkMode: state.darkMode,
        usuario: state.usuario,
        notificacion: state.notificacion,
        pulso:state.pulso,
        loader: state.loader,
        mostrarNotificacion,
        mostrarLoader,
        cargarUsuario,
        activarOscuro,
        enviarPulso,
        logout
      }}
    >
     <Propager >{props.children}</Propager>
    </Initializer.Provider>
  );
};
export default Store;
