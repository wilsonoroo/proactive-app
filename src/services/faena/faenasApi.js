

import { basePath } from '../../config/config';

export async function obtenerFaenasApi() {
    let url = `${basePath}/faenas/all`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function crearFaena(values) {
    let url = `${basePath}/faenas`;

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

export async function actualizarFaena(values) {
    console.log(values)
    let url = `${basePath}/faenas/${values._id}`;

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

export async function eliminarFaena(values) {
    let url = `${basePath}/faenas/${values}`;

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





