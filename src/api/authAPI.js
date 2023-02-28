import { basePath } from '../config/config';
import { getAccessToken } from './token';

export async function ingresarUsuarioApi(email, password) {
  const url = `${basePath}/login`;
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }
  try {
    const response = await fetch(url, params);
    return response;

  } catch (err) {
    console.log(err);
  }


}

export async function reIngresarUsuarioApi() {
  const url = `${basePath}/token`;

  const params = {
    method: "GET",
    'mode': 'cors',
    headers: {
      "Authorization": getAccessToken(),
      'Content-Type': 'application/json',
      crossorigin: true,
    }
  }
  try {
    const response = await fetch(url, params);
    const data = await response;
    return data;

  } catch (err) {
    console.log(err);
  }
}