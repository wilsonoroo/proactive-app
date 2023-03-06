import { useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../../components/CustomModalMensaje/CustomModalMensaje";
import FormularioCrearUsuario from "./FormularioCrearUsuario";
import { FormularioCrearUsuarioV } from "./FormularioCrearUsuarioV";

export default function AgregarUsuario(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });

  const utils = props?.utils;
  // console.log(utils.cuadrillas)


  return (
    <div>
      <CustomButton icon={Icons.UserPlus} endIcon={true} typeColor="primary" onClick={() => setOpenModal(true)}>Nuevo Usuario</CustomButton>
      <CustomModal
        titulo="Nuevo Usuario"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <FormularioCrearUsuarioV setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} utils={utils} />
      </CustomModal>
      <CustomModalMensaje
        titulo={"Creación de Usuario"}
        openModal={openModalMensaje.isActive}
        setOpenModal={setOpenModalMensaje.isActive}
      >
        <div>
          <div className='d-flex justify-content-center'>
            <div className='d-grep'>
              <div className='d-flex justify-content-center h3'>{openModalMensaje.titulo}</div>
              <div className='d-flex justify-content-center h5 m-5'>{openModalMensaje.descripcion}</div>
              <div className='d-flex justify-content-end'>
                <CustomButton icon={Icons.ChevronRight} onClick={() => setOpenModalMensaje({ ...openModalMensaje, isActive: false })}>Aceptar</CustomButton>
              </div>
            </div>
          </div>
        </div>
      </CustomModalMensaje>
    </div>
  );
}