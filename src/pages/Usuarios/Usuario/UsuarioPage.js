import { useParams } from "react-router-dom";
import CustomDivider from "../../../components/CustomDivider";
import CustomImagenAvatar from "../../../components/CustomImagenAvatar";
import Loading from "../../../components/Loading";
import MainContainer from "../../../layouts/MainContainer";

import { Grid } from "@mui/material";
import { useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../../components/CustomModalMensaje/CustomModalMensaje";


import useFetch from "../../../hooks/useFetch";
import { getUsuario, getUsuarioByUid } from "../../../services/database/usuariosServices";
import DetallesUsuario from "../component/Usuario/DetallesUsuario";




export default function UsuariosPage() {
  const tituloPage = "Usuarios";
  const params = useParams();

  const { id: idParams, idEmpresa: idEmpresa } = params;


  const [openModal, setOpenModal] = useState(false);


  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const { data: userv, firstLoading, refreshData: refreshDataFaenas } = useFetch(() => getUsuarioByUid(idParams));
  const { data: usuario, firstLoadingUsuario, refreshData: refreshDataUsuario } = useFetch(() => getUsuario(idParams, idEmpresa));

  console.log(userv)




  const handlerEdit = (data) => {
    setOpenModal(true)
  }








  const handleOpenModalFile = () => {
    console.log("onclick")

  }




  const handleChangeLicencias = (data) => {
    console.log('handleChangeLicencias', data);
    // functionUpdateApi(......)
    // refreshData
  }




  if (firstLoading) {
    return <Loading />
  } else {
    return (
      <MainContainer titulo={tituloPage}>
        <CustomModal
          titulo="Nuevo Requisito"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >

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
        <div className="d-flex justify-content-start align-items-center">
          <div className="h1">{usuario?.nombre}</div>
        </div>
        <div><pre>{JSON.stringify(usuario, null, 2)}</pre></div>;
        <CustomDivider />
        <div className="row">

          {/* COLUMNA IZQUIERDA */}
          <div className="col-2">

            {
              fotoPerfil !== null ?
                <CustomImagenAvatar src={fotoPerfil} /> :
                <CustomImagenAvatar letras={`${usuario?.displayName}`} />
            }


            {/* LICENCIAS */}
            <CustomDivider />

            <CustomDivider />

            {/* CARGOS */}
            <div className="my-3">

              <Grid pt={2}>
                <CustomButton icon={Icons.Plus} endIcon={true} typeColor="primary" >Confirmar Servicio</CustomButton>
              </Grid>
            </div>
            {/* CARGOS */}
            <div className="my-3">

              <Grid pt={2}>
                <CustomButton icon={Icons.Plus} endIcon={true} typeColor="primary" onClick={handlerEdit}>Agregar Cargos</CustomButton>
              </Grid>
            </div>

          </div>

          {/* COLUMNA DERECHA */}
          <div className="col-10">
            <DetallesUsuario usuario={usuario} />
            <CustomDivider />


          </div>
        </div>
      </MainContainer>
    );
  }
}