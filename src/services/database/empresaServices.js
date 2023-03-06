import { child, get, ref } from "firebase/database";
import { database } from "../config";

/**
 * Obtiene la configuración activa para una determinada empresa.
 * @param empresa - el nombre de la empresa
 */
export const getActive = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/config`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};
/**
 * Obtiene el objeto utils de la base de datos.
 * @param empresa - El nombre de la empresa.
 */

export const getUtils = async (empresa) => {
  try {
    var snapshot = await get(child(ref(database), `empresas/${empresa}/utils`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.log(false);
    return false;
  }
};

