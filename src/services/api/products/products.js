import axios from 'axios'

export const subirArchivo = async (archivo, token) => {
    let url = import.meta.env.VITE_API_URL + "products/import"; // Cambia la URL según la ruta de tu endpoint de carga de archivos en el servidor
    let formData = new FormData();
    formData.append('file', archivo); // Agrega el archivo al objeto FormData

    let setting = {
        method: "POST",
        url: url,
        data: formData,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Especifica el tipo de contenido como multipart/form-data
        }
    };

    try {
        const { data } = await axios(setting);
        return data;
    } catch (error) {
        console.error("Error al subir archivo:", error);
        throw error;
    }
};
export const  obtenerTodos = async ({queryKey}) => {
    const [_, token] = queryKey
    console.log("TOKEN")
    console.log(token)
    let url = import.meta.env.VITE_API_URL+ "products"
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    data.push(data[0])
    data.push(data[1])
    data.push(data[2])
    data.push(data[0])
    data.push(data[1])
    data.push(data[2])
    data.push(data[0])
    data.push(data[1])
    data.push(data[2])
    console.log(data)
    return data;
};

export const  obtenerTipoProductos = async (token) => {
    let url = import.meta.env.VITE_API_URL+ `boxes/types/all`
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const  obtenerTodosPagina = async ({queryKey}) => {
    const [_, token,page,filters] = queryKey
    console.log("TOKEN")
    console.log(token)
    let url = import.meta.env.VITE_API_URL+ `products/page/${page}`
    let setting = {
        method: "GET",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    if(filters){
        setting.params = filters
    }
    const { data } = await axios(setting)
    return data;
};
export const  obtenerTodosVendedorPagina = async (token,filters,page) => {
    let url = import.meta.env.VITE_API_URL+ `products/vendor/page/${page}`
    let setting = {
        method: "GET",
        url: url,
        params: filters,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};
export const  obtenerTodosFiltro = async (token) => {
    let url = import.meta.env.VITE_API_URL+ "products"
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
    let url = import.meta.env.VITE_API_URL+ "products"
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
    let url = import.meta.env.VITE_API_URL+ "products/"+obj.id
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
    let url = import.meta.env.VITE_API_URL+ "products/"+id
    let setting = {
        method: "DELETE",
        url: url,
        headers: { 'Accept': 'application/json','Authorization': `Bearer ${token}` }
    };
    const { data } = await axios(setting)
    return data;
};

