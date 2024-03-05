import axios from 'axios'

export const  obtenerTodosFiltro = async (token,processId) => {
    let url = import.meta.env.VITE_API_URL+ "chats/process/"+processId
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const sendClientMessage = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "chats/client"
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
export const sendVendorMessage = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "chats/vendor"
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
