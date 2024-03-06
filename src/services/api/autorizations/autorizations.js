import axios from 'axios'


export const  obtenerTodos = async ({queryKey}) => {
    const [_, token,obj] = queryKey
    let url = import.meta.env.VITE_API_URL+  `autorizations`
    let setting = {
        method: "GET",
        url: url,
        params:obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const  obtenerTodosFiltro = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+  `autorizations`
    let setting = {
        method: "GET",
        url: url,
        params:obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const autorizar = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "autorizations"
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
