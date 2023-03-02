import { useEffect, useState } from "react";
import * as Icons from 'react-feather';
import FormularioCrearCargo from "../../components/Cargos/FormularioCrearCargo";
import TablaCargo from "../../components/Cargos/TablaCargo";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../components/CustomModalMensaje/CustomModalMensaje";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import MainContainer from "../../layouts/MainContainer";
import { elimianarCargoApi, obtenerCargosApi } from "../../services/cargos/cargos";


export default function CargosPage() {
    // titulo para el container y el html
    const tituloPage = "Cargos";

    // custom hook para realizar peticion
    const { data: cargos, firstLoading, refreshData } = useFetch(() => obtenerCargosApi());
    const [openModal, setOpenModal] = useState(false);
    const [cargosMaps, setCargosMaps] = useState([]);
    const [openModalMensaje, setOpenModalMensaje] = useState({
        titulo: "",
        descripcion: "",
        isActive: false,
    });
    const [dataSelect, setDataSelect] = useState(null);

    const handleEliminar = (idUsuario) => {
        console.log("handleEliminar")

        elimianarCargoApi(idUsuario).then((response) => {
            console.log(response);
            if (response?.status === 200) {
                refreshData();
                setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
            } else {
                setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
            }
        });
    }

    const handleEdit = (data) => {
        console.log(data);
        setDataSelect(data)
        setOpenModal(true)
    }

    useEffect(() => {
        if (cargos) {
            setCargosMaps(cargos.map((item, index) => {
                return { ...item, num: index + 1 }
            }))
        }

    }, [cargos])

    return (
        <MainContainer titulo={tituloPage}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="h1">{tituloPage}</div>
                <CustomButton icon={Icons.PlusSquare} endIcon={true} typeColor="primary" onClick={() => setOpenModal(true)}>Agregar Cargo</CustomButton>
                <CustomModal
                    titulo="Nuevo Cargo"
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                >
                    <FormularioCrearCargo setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} data={dataSelect} />
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
                    <TablaCargo cargos={cargosMaps} refreshData={refreshData} handleEliminar={handleEliminar} onEdit={handleEdit} />
            }
        </MainContainer>
    );
}