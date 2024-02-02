import axios from 'axios'

export const obtenerTodos = async ({queryKey}) => {
    const [_, token] = queryKey
    let url = import.meta.env.VITE_API_URL+ "results"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerPorId = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "results/"+id
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
export const imprimirResultados =  (id) => {
    return import.meta.env.VITE_API_URL+ "print/"+id
};
export const obtenerResultadosPorPaciente = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "pacient_results/"+id
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const crear = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "results"
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
    let url = import.meta.env.VITE_API_URL+ "results"
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
export const eliminar = async (id) => {
    let url = import.meta.env.VITE_API_URL+ "results/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json' }
    };
    const { data } = await axios(setting)
    return data;
};

