import { useEffect, useMemo, useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../components/CustomModalMensaje/CustomModalMensaje";
import { FormularioCrearFaenaV } from "../../components/Faenas/FormularioCrearFaenaV";

import TablaFaenas from "../../components/Faenas/TablaFaenas";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import MainContainer from "../../layouts/MainContainer";
import { getUtils } from "../../services/database/empresaServices";
import { getFaenasArray } from '../../services/database/faenasServices';


export default function FaenasPage() {
  // titulo para el container y el html
  const tituloPage = "Faenas";
  const empresa = "shingeki_no_sushi";

  const [openModal, setOpenModal] = useState(false);
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });

  const [list, setList] = useState([]);
  // custom hook para realizar peticion
  const { data: faenas, firstLoading, refreshData, isLoading } = useFetch(() => getFaenasArray(empresa));
  const faenasList = useMemo(() => {
    if (!faenas) {
      return [];
    }
    const filteredFaenas = Object.keys(faenas).map((key) => faenas[key]).filter((faena) => faena.isEliminado === false);
    console.log(filteredFaenas)
    return filteredFaenas.map((faena) => ({
      id: faena.id,
      nombre: faena.nombre,
      region: faena.region,
      comuna: faena.comuna,
      abreviatura: faena.abreviatura,
      tipoFaena: faena.tipoFaena,
      isVigente: faena.isVigente ? "Vigente" : "No Vigente"

    }));
  }, [faenas]);

  useEffect(() => {
    setList(faenasList);
  }, [faenasList]);





  const [utils, setUtils] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const utilsData = await getUtils(empresa); // Llamamos a la función getUtils
      if (utilsData) {
        setUtils(utilsData); // Si hay datos, los guardamos en el estado
      }
    };
    fetchData();
  }, [empresa]);
  // console.log(utils)




  return (
    <MainContainer titulo={tituloPage}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="h1">{tituloPage}</div>
        <CustomButton icon={Icons.PlusSquare} endIcon={true} typeColor="primary" onClick={() => setOpenModal(true)}>Nueva Faena</CustomButton>
        <CustomModal
          titulo="Nueva Faena "
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          {/* <FormularioCrearFaena setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} /> */}
          <FormularioCrearFaenaV utils={utils} />

        </CustomModal>
        <CustomModalMensaje
          titulo={"Nueva Faena "}
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
          <TablaFaenas faenas={list} refreshData={refreshData} loadingData={isLoading} />
      }
    </MainContainer>
  );
}