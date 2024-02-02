import axios from 'axios'


export const obtenerResumen = async (obj,token) => {
    const formData = new FormData();
    formData.append('generation_type_id', obj.generation_type_id);
    formData.append('prompt', obj.prompt);
    formData.append('command', obj.command);
    formData.append('file', obj.file);
    let url = import.meta.env.VITE_API_URL+ "generate"
    let setting = {
        method: "POST",
        url: url,
        data: formData,
        body: formData,
        headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + token }
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerResumenPorId = async (obj,token) => {
    let url = import.meta.env.VITE_API_URL+ "generate/"+obj.id
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + token }
    };
    const { data } = await axios(setting)
    return data;
};
export const obtenerResultado = async (id,token) => {
    let url = import.meta.env.VITE_API_URL+ "generation/"+id
    let setting = {
        method: "GET",
        url: url,
     
        headers: { 'Accept': 'application/json','Authorization': 'Bearer ' + token }
    };
    const { data } = await axios(setting)
    return data;
};


