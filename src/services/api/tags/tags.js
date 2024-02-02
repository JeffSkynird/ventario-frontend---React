import axios from 'axios'


export const obtenerTodos = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "tags"
   /*  let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting) */
    let data= []
    return data;
};

export const obtenerPorId = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "tags/"+id
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerResultadosId = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "order_results/"+id
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};


export const asignarTag = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "add_tags_generations"
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const crear = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "tags"
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const editar= async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "tags/"+ obj?.id
    let setting = {
        method: "POST",
        url: url,
        params: obj,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const eliminar = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "tags/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json' ,'Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const eliminarPorGeneracion = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "tags_by_generation/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json' ,'Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

