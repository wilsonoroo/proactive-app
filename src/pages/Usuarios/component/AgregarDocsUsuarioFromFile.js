import { useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../../components/CustomModalMensaje/CustomModalMensaje";
import FormularioAddDocsUsuarioFromFile from "./FormularioAddDocsUsuarioFromFile";


export default function AgregarDocsUsuarioFromFile({ refreshData }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });

  return (
    <div>
      <CustomButton icon={Icons.Upload} endIcon={true} typeColor="primary" onClick={() => setOpenModal(true)}>Carga Masiva de docucmentos</CustomButton>
      <CustomModal
        titulo="Cargar Archivo"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <FormularioAddDocsUsuarioFromFile setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} />
      </CustomModal>
      <CustomModalMensaje
        titulo={"Carga masiva de documentos"}
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