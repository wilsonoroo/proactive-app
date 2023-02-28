import { basePath } from '../../config/config';
import { checkVarible } from "../../utils/functions";
export async function obtenerPersonalApi() {
    let url = `${basePath}/trabajador/all`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}


export async function obtenerPersonaPorCargolApi(idCargo) {
    if (checkVarible(idCargo) && idCargo !== "") {
        let url = `${basePath}/trabajador/find?cargosCompatibles__in=${idCargo}`;

        try {
            const response = await fetch(url);
            const data = await response;
            return data;

        } catch (err) {
            console.log(err);
        }
    } else {
        return []
    }

}



export async function obtenerPersonaIndividualApi(idUsuario) {
    const url = `${basePath}/trabajador/${idUsuario}`;

    try {
        const response = await fetch(url);
        return response;

    } catch (err) {
        console.log(err);
    }
}



export async function obtenerResponsables() {
    let url = `${basePath}/users?isResponsable__eq=true`;

    try {
        const response = await fetch(url);
        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}



export async function actualizarPersonal(user) {
    let url = `${basePath}/trabajador/${user._id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(user),
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

export async function crearTrabajadorApi(user) {
    let url = `${basePath}/trabajador`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
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

export async function updateConSinProblemas(user, estado) {
    let url = `${basePath}/trabajador/${user}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({ conProblemas: estado }),
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

export async function uploadFileApi(idUser, iddoc, item) {
    let url = `${basePath}/trabajador/${idUser}/upload/${iddoc}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: item,
            headers: {
                'Accept': 'application/json',
            },
        });


        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function upDateUploadFileApi(idUser, iddoc, item) {
    let url = `${basePath}/trabajador/${idUser}/update/upload/${iddoc}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: item,
            headers: {
                'Accept': 'application/json',
            },
        });


        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function upDateUploadFileApiWithRut(rutUser, iddoc, item) {
    let url = `${basePath}/trabajador/${rutUser}/rut/update/upload/${iddoc}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: item,
            headers: {
                'Accept': 'application/json',
            },
        });

        const data = await response.clone().json();
        return data;

    } catch (err) {
        console.log(err);
    }
}

export async function deleteUploadFileApi(idUser, iddoc, item) {
    let url = `${basePath}/trabajador/${idUser}/delete/${iddoc}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            },
        });


        const data = await response;
        return data;

    } catch (err) {
        console.log(err);
    }
}











