import { basePath } from '../../config/config';
import { getAccessToken } from '../token';

export async function obtenerRequisitosApi() {
    let url = `${basePath}/requisitos/all`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function donwloadFileCompilado(values) {
    let url = `${basePath}/requisitos/createCompilado`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function crearCargoRequisito(values) {
    let url = `${basePath}/requisitos`;

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
export async function obtenerRequisitosPorFAena(idFaena) {

    const url = `${basePath}/requisitos/find?faenas__in=${idFaena}`;

    try {

        if (idFaena) {
            const response = await fetch(url, {
                headers: new Headers({
                    "Authorization": getAccessToken(),
                    'Content-Type': 'application/json',
                    crossorigin: true,
                }),
            });
            return response;
        }


    } catch (err) {
        console.error(err);
    }
}

export async function actualizarRequisito(values) {
    console.log(values)
    let url = `${basePath}/requisitos/${values._id}`;

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





