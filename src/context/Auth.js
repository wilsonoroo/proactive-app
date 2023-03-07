import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { auth } from "../services/config/";
import { getActive, getUtils } from "../services/database/empresaServices";
import { getUsuario, getUsuarioByUid } from "../services/database/usuariosServices";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [config, setConfig] = useState(null);
  const [utils, setUtils] = useState(null);
  const [active, setActive] = useState(false);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userSemiComplete = await getUsuarioByUid(user?.uid);
      const userComplete = await getUsuario(user?.uid, userSemiComplete?.empresaId);
      setCurrentUser(userComplete);
      setEmpresa(userSemiComplete?.empresaId);
      setUtils(await getUtils(userSemiComplete?.empresaId));
      const activeEmpresa = await getActive(userSemiComplete?.empresaId);
      setConfig(activeEmpresa);
      setActive(activeEmpresa?.isActive);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Loading />
  }
  return (

    <AuthContext.Provider
      value={{
        currentUser,
        empresa,
        utils,
        active,
        config
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
}