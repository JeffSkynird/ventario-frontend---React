import axios from 'axios'


export const obtenerUsuarioAutenticado = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "showAuth"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const obtenerUsuarios = async ({queryKey}) => {
    const [_, token] = queryKey
    let url = import.meta.env.VITE_API_URL+ "users"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const crearUsuarios = async (obj) => {
    let url = import.meta.env.VITE_API_URL+ "users"
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json' }
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerUsuario = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "user"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const editarUsuarios = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "user"
    let setting = {
        method: "PUT",
        url: url,
        params: obj,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json' ,'Authorization': `Bearer ${token}`}
    };
    const { data } = await axios(setting)
    return data;
};
export const eliminarUsuario = async (id) => {
    let url = import.meta.env.VITE_API_URL+ "users/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json' }
    };
    const { data } = await axios(setting)
    return data;
};

