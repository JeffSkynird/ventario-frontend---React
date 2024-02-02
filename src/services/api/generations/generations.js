import axios from 'axios'




export const obtenerPdf = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "export_generation/"+id
    let setting = {
        method: "GET",
        url: url,
        responseType: 'blob', 
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const obtenerResultados = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "results/"+id
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

export const obtenerKpis = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "get_generation_kpis"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};


export const obtenerUltimas = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "get_last_generations"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
 
export const obtenerTodos2 = async ({queryKey}) => {
    //obtiene el token y el id

    const [_, token,selectedTag] = queryKey
/*     let url = import.meta.env.VITE_API_URL+ "generations"
    let setting = {
        method: "GET",
        url: url,
        params: {tag_id: selectedTag},
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    console.log(data) */
    
    let dataFinal = {
        data:[
        {
            tag:"GREENVIC",
            status:"SAN FERNANDO",
            estado:"ME-02020013",
            visita: "CJ-OOIOOOI",
            statuss: "CJ ARMAQ 4,50KG GRAPE GWICH",
            oferta: "5K",
            formulario:"9.230",
            fechaRetiro:"20.150",
            precio:150,
            ofertaS:"S",
            imagen:"Si",
            ventamin:"",
            restricciones:"001"
            
        }
        
    ]
}
    return dataFinal;
};


export const obtenerTodos = async ({queryKey}) => {
    //obtiene el token y el id

    const [_, token,selectedTag] = queryKey
/*     let url = import.meta.env.VITE_API_URL+ "generations"
    let setting = {
        method: "GET",
        url: url,
        params: {tag_id: selectedTag},
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    console.log(data) */
    
    let dataFinal = {
        data:[
        {
            tag:"Producto 1",
            status:"2024-02-01 19:44:37",
            estado:"Activo",
            visita: "2024-02-01 19:44:37",
            statuss: "Activo",
            oferta: "$1000",
            formulario:1,
            fechaRetiro:"2024-02-01 19:44:37"
            
        }
        
    ]
}
    return dataFinal;
};

export const obtenerTodosLista = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "generations"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};


export const obtenerTodosPublic = async ({queryKey}) => {
    const [_, pacient_id] = queryKey
    let url = import.meta.env.VITE_API_URL+ "pacient_generations/" + pacient_id
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json'}
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerPorId = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "generations/"+id
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


export const crear = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "generations"
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
    let url = import.meta.env.VITE_API_URL+ "generations/"+ obj?.id
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
    let url = import.meta.env.VITE_API_URL+ "generations/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json' ,'Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};


export const obtenerPorTag = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "tags/"+id+"/generations"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
