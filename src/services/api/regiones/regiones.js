import axios from 'axios'


export const  obtenerTodos = async ({queryKey}) => {
    const [_, token] = queryKey
    let url = import.meta.env.VITE_API_URL+ "regiones"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    console.log(data)
    return data;
};
export const  obtenerTodosFiltro = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "regiones"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    console.log(data)
    return data;
};
export const crear = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "regiones"
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}`  }
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
export const editar = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "regiones/"+obj.id
    let setting = {
        method: "PUT",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json' ,'Authorization': `Bearer ${token}`}
    };
    const { data } = await axios(setting)
    return data;
};
export const eliminar = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "regiones/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

