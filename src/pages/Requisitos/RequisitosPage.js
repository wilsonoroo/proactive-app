import { useEffect, useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../components/CustomModalMensaje/CustomModalMensaje";
import Loading from "../../components/Loading";
import FormularioCrearRequisito from "../../components/Requisitos/FormularioCrearRequisito";
import TablaRequisitos from "../../components/Requisitos/TablaRequisitos";
import useFetch from "../../hooks/useFetch";
import MainContainer from "../../layouts/MainContainer";
import { obtenerRequisitosApi } from "../../services/requisitos/requisitos";

export default function UsuariosPage() {
  // titulo para el container y el html
  const tituloPage = "Requisitos";

  const [usuariosMaps, setUsuariosMaps] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });
  // custom hook para realizar peticion
  const { data: usuarios, firstLoading, refreshData } = useFetch(() => obtenerRequisitosApi());

  const [dataSelect, setDataSelect] = useState(null);

  useEffect(() => {
    if (usuarios) {
      setUsuariosMaps(usuarios.map((item, index) => {
        return { ...item, num: index + 1 }
      }))
    }

  }, [usuarios])

  const handlerEdit = (data) => {
    console.log(data);
    setDataSelect(data)
    setOpenModal(true)
    setEdit(true)
  }

  return (
    <MainContainer titulo={tituloPage}>

      <div className="d-flex justify-content-between align-items-center">
        <div className="h1">{tituloPage}</div>
        <CustomButton icon={Icons.PlusSquare} endIcon={true} typeColor="primary" onClick={() => {
          setOpenModal(true)
          setDataSelect(null)
          setEdit(false)
        }}>Nuevo Requisito</CustomButton>
        <CustomModal
          titulo="Nuevo Requisito"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <FormularioCrearRequisito setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} data={dataSelect} edit={edit} />
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
      <CustomDivider />
      {
        firstLoading ?
          <Loading />
          :
          <TablaRequisitos usuarios={usuariosMaps} refreshData={refreshData} onEdit={handlerEdit} />
      }
    </MainContainer>
  );
}