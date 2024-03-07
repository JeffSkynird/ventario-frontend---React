import axios from 'axios'




export const  obtenerProcesosPostVisita = async ({queryKey}) => {
    const [_, token,id] = queryKey
    let url = import.meta.env.VITE_API_URL+  `processes/post_visita/all/${id}`
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const  obtenerTodos = async ({queryKey}) => {
    const [_, token,type,id] = queryKey
    let url = import.meta.env.VITE_API_URL+  `processes/${type}/${id}`
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const  obtenerPorId = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+  `processes/${id}`
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const  obtenerTodosFiltro = async (obj,token,type,id) => {
    let url = import.meta.env.VITE_API_URL+  `processes/${type}/${id}`
    let setting = {
        method: "GET",
        url: url,
        params: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const  obtenerTodosAdmin = async (token) => {
    let url = import.meta.env.VITE_API_URL+  `processes/`
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const  obtenerTodosCerrados = async ({queryKey}) => {
    const [_, token,type,id] = queryKey
    let url = import.meta.env.VITE_API_URL+  `processes/closed/${type}/${id}`
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const crearOferta = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "offers"
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
export const crearVisita = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "visits"
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
export const editarEstadoOferta = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "offers/changeStatus/"+obj.id
    let setting = {
        method: "PUT",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}`  }
    };
    const { data } = await axios(setting)
    return data;
};
export const editarEstadoVisita = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "visits/changeStatus/"+obj.id
    let setting = {
        method: "PUT",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}`  }
    };
    const { data } = await axios(setting)
    return data;
};
export const editarOferta = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "offers/"+obj.id
    let setting = {
        method: "PUT",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}`  }
    };
    const { data } = await axios(setting)
    return data;
};
export const editarVisita = async (obj,token ) => {
    let url = import.meta.env.VITE_API_URL+ "visits/"+obj.id
    let setting = {
        method: "PUT",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}`  }
    };
    const { data } = await axios(setting)
    return data;
};


export const  obtenerHorarios =  async (token) => {
    let url = import.meta.env.VITE_API_URL+ "visits/schedules/all"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    console.log(data)
    return data;
};