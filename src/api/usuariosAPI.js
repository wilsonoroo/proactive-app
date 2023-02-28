import { basePath } from '../config/config';

export async function obtenerUsuariosApi() {
  let url = `${basePath}/users`;

  try {
    const response = await fetch(url);

    return response;

  } catch (err) {
    console.log(err);
  }
}

export async function obtenerProductosApi() {
  let url = `${basePath}/productos`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;

  } catch (err) {
    console.log(err);
  }
}

export async function deleteTrabajador(idUsuario) {


  const url = `${basePath}/trabajador/${idUsuario}`;
  const params = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ isActivo: false })
  }
  try {
    const response = await fetch(url, params);
    return response;

  } catch (err) {
    console.log(err);
  }
}

export async function cambiarEstadoUsuarioApi(idUsuario, data) {
  const url = `${basePath}/trabajador/${idUsuario}/cambiar-activo`;
  const params = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  try {
    const response = await fetch(url, params);
    const data = response.json();
    return data;

  } catch (err) {
    console.log(err);
  }
}

export async function crearUsuarioApi(data) {
  const url = `${basePath}/sign-up`;
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }

  try {
    const response = await fetch(url, params);
    const data = await response.json();
    return data;

  } catch (err) {
    console.log(err);
  }
}

export async function obtenerUsuarioApi(idUsuario) {
  const url = `${basePath}/users/${idUsuario}`;

  try {
    const response = await fetch(url);
    return response;

  } catch (err) {
    console.log(err);
  }
}