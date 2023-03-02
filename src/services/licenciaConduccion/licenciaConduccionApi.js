

import { basePath } from '../../config/config';

export async function obtenerLicenciaConduccionApi() {
    let url = `${basePath}/licencias_conducir/all`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function crearLicenciaConduccion(values) {
    let url = `${basePath}/licencias_conducir`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        console.log(response)

        return response;

    } catch (err) {
        console.log(err);
    }
}

export async function actualizarLicenciaConduccion(values) {
    console.log(values)
    let url = `${basePath}/licencias_conducir/${values._id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        console.log(response)

        return response;

    } catch (err) {
        console.error(err);
    }
}

export async function eliminarLicenciaConduccion(values) {
    let url = `${basePath}/licencias_conducir/${values}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({ isEliminado: true }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        console.log(response)

        return response;

    } catch (err) {
        console.log(err);
    }
}





