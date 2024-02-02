import axios from 'axios'

export const payment = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "payment"
    let setting = {
        method: "POST",
        url: url,
        body:obj,
        data: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
}
export const cancelarMembresia = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "cancel_membership"
    let setting = {
        method: "POST",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};


export const activarMembresia = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "activate_membership"
    let setting = {
        method: "POST",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const obtenerTodos = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "memberships"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};


export const cambiarMembresia = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "change_membership"
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