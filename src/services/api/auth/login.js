import axios from 'axios'

export const iniciarSesion = async (obj) => {
 /*    let url = import.meta.env.VITE_API_URL+ "auth/login"
    let setting = {
        method: "POST",
        url: url,
        data: obj,
        body: obj,
        headers: { 'Accept': 'application/json' }
    };
    const { data } = await axios(setting) */
    let rol = "comprador";
    if(obj.email=="admin@gmail.com"){
         rol = "comprador";
    }else{
        rol="vendedor";
    }

    let datos = {
        "status": "200",
        "message": "Inicio de sesi\u00f2n correcto",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjVmYzZmZjc3NjkzMDNjYjg0Yzg3Nzc1NzJmYjE2OGFmNGZiOGVlZGRkZGQ0NzY5NWE1NDQxNGIxZjYxN2Y2MzczYzZmZTNjZjc1NjAwMDUiLCJpYXQiOjE3MDY4NDYwOTguMjc0MTc0LCJuYmYiOjE3MDY4NDYwOTguMjc0MTc5LCJleHAiOjE3Mzg0Njg0OTguMjYzNjQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.vs3XBIw3m1RbWEaCi18LwTDcuT7iyfsE7P1Je74OocLv9zKnQJ63JkKH9p6VErG_NRGvKmAir-vuMrVcp3tggkOECIUnqQpm2CyolYUHEPsztM0h5eSH0zL4dJ2x8vw7a1rZQ5-vHgbDtJwuItn9BbusJg6_yvKdREHb_fZ1dDWdybWx6fqXnwbO_rZcni2GvW4fgS6wcX6izEn2_b0JjqCyPtVpZJK9Bn8ZSFah0MPlFnOlPBvbaR8NtoVIsPB5pwCWA72kDbU-qpOX4_MRIMdfmhbHY9-b_Mzbr7Qfz89dKKj1JD0ihc3qvF_gyIx_D07YDzAGEno96j0GN6MrMdEgQrN7aRZT_LWiknev8Nsh4nThB1oB6l-Y5mqAkj1drjWsXJbRjOr-e4aeTyDCYPTjB9zs9bb-25NhoNE5DnDik2iGonR-BFOetFzSf6zZ8CzOfJgOBXOAPQiUMU513iBd7RECuHnVSNgy4j862g6XA7Re_S-h7UQ-E-XmBoqzYrRucXEHKbijihDphvHE656wcypftpc9WwXccOBlvyNO3MM4JB9Zc_cxvbwPWu7wdG4i-jpLovueHib8zyAP-ak4jrT1cUUL8d4dOrP2xuMQWICfTxum3ruPAjzL-UTJgrvmcHL-sJBRsZzl1GifRbbBnfiz2hoa0D1V74g0LRs",
        "user": {
            "id": 1,
            "type":rol,
            "email": "admin@gmail.com",
            "names": "Admin1",
            "last_names": "Admin1",
            "created_at": "2022-12-10 03:48:55",
            "updated_at": "2022-12-14T00:43:01.000000Z",
            "deleted_at": null
        }
    }
    console.log(datos)
    return datos;
};

export const cerrarSesion = async (token) => {
    let url = import.meta.env.VITE_API_URL + "auth/logout"
    let setting = {
        method: "POST",
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    const { data } = await axios(setting)
    return data;
};
/* export const inicaiarSesion = (email, password, store, history) => {
    const { cargarUsuario, playSound, mostrarNotificacion, mostrarLoader } = store
    var raw = {
        "email": email,
        "password": password
    }
    let url = ENTRYPOINT + "auth/login"
    let setting = {
        method: "POST",
        url: url,
        data: raw,
        body: raw,
        headers: { 'Accept': 'application/json' }

    };
    mostrarLoader(true)

    axios(setting)
        .then((res) => {
            let response = res.data
            if (response.type != "error") {
                let user = {
                    user: response.user,
                    token: response.token
                }
                let encrypt = encriptarJson(JSON.stringify(user))

                cargarUsuario(encrypt)
                guardarSession(encrypt);
                mostrarLoader(false)
                mostrarNotificacion({ type: "success", message: response.message })

                if(response.user.type_user=="client"){
                  history.push('dashboard');
                }else{
                  history.push('dashboard_asesor');
                } 
                window.location.href = '/control/monitoreo';

            } else {
                mostrarNotificacion({ type: "error", message: response.message })
                mostrarLoader(false)

            }
        })
        .catch((error) => {
            mostrarLoader(false)




        });
}
export const cerararSesion = (store) => {
    const { usuario, logout, mostrarNotificacion, playSound, mostrarLoader } = store

    let url = ENTRYPOINT + "auth/logout"
    let setting = {
        method: "POST",
        url: url,

        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(desencriptarJson(usuario)).token
        }

    };
    mostrarLoader(true)

    axios(setting)
        .then((res) => {
            logout()
            removeSession()

            mostrarNotificacion({ type: "success", message: res.data.message })
            mostrarLoader(false)
            window.location.href = "/login"

        })
        .catch((error) => {
            mostrarLoader(false)

            let response = error.data


        });
} */