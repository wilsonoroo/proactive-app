import { basePath } from '../../config/config';

export async function obtenerSolicitudesApi() {
    let url = `${basePath}/solicitudes/all`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function obtenerSolicitudApi(idUsuario) {
    const url = `${basePath}/solicitudes/${idUsuario}`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function crearSoicitudReclutamiento(values) {
    let url = `${basePath}/solicitudes`;
    let totalPersonalSolicitado = 0;

    let solicitud = {
        nombreDelProyecto: values.nombreProyecto,
        faena: values.faena,
        estado: "pendientes",
        totalPersonalSolicitado: totalPersonalSolicitado,
        totalPersonalAcreditado: 0,
        fechaInicioProyecto: values.fechaInicioProyecto,
        responsable: values.responsable,
        personalSolicitadoCargo: []
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(solicitud),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });


        return response;

    } catch (err) {
        console.log(err);
    }
}



export async function createSolicitudDePersonal(values) {
    let url = `${basePath}/solicitudes_personal`;


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




export async function addUsuarioAsolicitud(idSolicitudPersonal, usuario) {

    let url = `${basePath}/solicitudes_personal/${idSolicitudPersonal}/addPersonal/${usuario}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });


        return response;

    } catch (err) {
        console.error(err);
    }
}

export async function deleteUsuarioAsolicitud(idSolicitudPersonal, usuario) {

    let url = `${basePath}/solicitudes_personal/${idSolicitudPersonal}/delete/${usuario}`;

    try {
        const response = await fetch(url, {
            method: "POST",
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



export async function actualizarSoicitudReclutamiento(values) {
    console.log(values)
    let url = `${basePath}/solicitudes/${values._id}`;

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


export async function enviarMensaje(values) {
    console.log(values)
    let url = `${basePath}/solicitudes/sendMensaje`;

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
        console.error(err);
    }
}







