import { useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../components/CustomModalMensaje/CustomModalMensaje";
import FormularioCrearFaena from "../../components/Faenas/FormularioCrearFaena";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import MainContainer from "../../layouts/MainContainer";
import { eliminarFaena, obtenerFaenasApi } from "../../services/template_name/faenasApi";

export default function TemplateName() {
    // titulo para el container y el html
    const tituloPage = "TemplateName";

    const [openModal, setOpenModal] = useState(false);
    const [openModalMensaje, setOpenModalMensaje] = useState({
        titulo: "",
        descripcion: "",
        isActive: false,
    });


    // custom hook para realizar peticion
    const { data: usuarios, firstLoading, refreshData } = useFetch(() => obtenerFaenasApi());

    const handleEliminar = (idUsuario) => {
        eliminarFaena(idUsuario).then((response) => {
            console.log(response);
            if (response?.status === 200) {
                refreshData();
                setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
            } else {
                setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
            }
        });
    }

    return (
        <MainContainer titulo={tituloPage}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="h1">{tituloPage}</div>
                <CustomButton icon={Icons.PlusSquare} endIcon={true} typeColor="primary" onClick={() => setOpenModal(true)}>Nueva Faena</CustomButton>
                <CustomModal
                    titulo="Nueva Faena / Planta Industrial"
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                >
                    <FormularioCrearFaena setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} />
                </CustomModal>
                <CustomModalMensaje
                    titulo={"Nueva Faena / Planta Industrial"}
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
                    <TemplateName usuarios={usuarios} refreshData={refreshData} onDelete={handleEliminar} />
            }
        </MainContainer>
    );
}