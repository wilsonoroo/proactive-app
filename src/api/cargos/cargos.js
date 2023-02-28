

import { basePath } from '../../config/config';

export async function obtenerCargosPorFaenas(idFaena) {
    if (idFaena !== null) {
        let url = `${basePath}/cargos/find?faenas__in=${idFaena}`;

        try {
            const response = await fetch(url);
            const data = await response;
            return data;

        } catch (err) {
            console.log(err);
        }
    }

}

export async function obtenerCargosApi() {
    let url = `${basePath}/cargos/all`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function crearCargoApi(values) {
    let url = `${basePath}/cargos`;

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



export async function actualizarCargo(values) {
    console.log(values)
    let url = `${basePath}/cargos/${values._id}`;

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


export async function elimianarCargoApi(values) {
    let url = `${basePath}/cargos/${values}`;

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







