import axios from 'axios'


export const  obtenerTodosPorUsuario = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+  `notifications/`+id
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const eliminarNotificaciones = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "notifications/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}`  }
    };
    const { data } = await axios(setting)
    return data;
};
