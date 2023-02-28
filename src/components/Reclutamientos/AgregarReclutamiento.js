import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import * as Icons from 'react-feather';
import CustomModal from "../CustomModal/CustomModal";
import CustomModalMensaje from "../CustomModalMensaje/CustomModalMensaje";
import FormularioCrearReclutamiento from "./FormularioCrearReclutamiento";

export default function AgregarReclutamiento({refreshData}) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });

  return (
    <div>
      <CustomButton icon={Icons.Activity} endIcon={true} typeColor="primary" onClick={() => setOpenModal(true)}>Nuevo Proyecto</CustomButton>
      <CustomModal
        titulo="Nuevo Proyecto"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <FormularioCrearReclutamiento setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData}/>
      </CustomModal>
      <CustomModalMensaje
        titulo={"Creación de Proyecto"}
        openModal={openModalMensaje.isActive}
        setOpenModal={setOpenModalMensaje.isActive}
      >
        <div>
          <div className='d-flex justify-content-center'>
            <div className='d-grep'>
              <div className='d-flex justify-content-center h3'>{openModalMensaje.titulo}</div>
              <div className='d-flex justify-content-center h5 m-5'>{openModalMensaje.descripcion}</div>
              <div className='d-flex justify-content-end'>
                <CustomButton icon={Icons.ChevronRight} onClick={() => setOpenModalMensaje({...openModalMensaje, isActive: false})}>Aceptar</CustomButton>
              </div>
            </div>
          </div>
        </div>
      </CustomModalMensaje>
    </div>
  );
}