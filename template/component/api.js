

import { basePath } from '../../config/config';

export async function obtenerTemplateNameApi() {
    let url = `${basePath}/templateName/all`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function crearTemplateName(values) {
    let url = `${basePath}/templateName`;

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

export async function actualizarTemplateName(values) {
    console.log(values)
    let url = `${basePath}/templateName/${values._id}`;

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

export async function eliminarTemplateName(values) {
    let url = `${basePath}/templateName/${values}`;

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





