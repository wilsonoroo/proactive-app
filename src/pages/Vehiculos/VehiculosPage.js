import { useEffect, useMemo, useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../components/CustomModalMensaje/CustomModalMensaje";
import Loading from "../../components/Loading";
import TablaVehiculos from "../../components/Vehiculos/TablaVehiculos";
import useFetch from "../../hooks/useFetch";
import MainContainer from "../../layouts/MainContainer";
import { FormularioCrearVehiculoV } from "../../components/Vehiculos/FormularioCrearVehiculoV";
import { getVehiculosArray, getVehiculos } from "../../services/database/vehiculosServices"
import { getUtils } from "../../services/database/empresaServices";


export default function VehiculosPage() {
  // titulo para el container y el html
  const tituloPage = "Vehículos";
  const empresa = "shingeki_no_sushi";

  // const [listaVehiculos, setListaVehiculos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });
  
  const [dataSelect, setDataSelect] = useState(null);
  
  const [list, setList] = useState([]);
  // custom hook para realizar peticion
  const { data: vehiculos, firstLoading, refreshData, isLoading } = useFetch(() => getVehiculos(empresa));
  const vehiculosList = useMemo(() => {
    if (!vehiculos) {
      return [];
    }
    const filteredVehiculos = Object.keys(vehiculos).map((key) => vehiculos[key]).filter((vehiculo) => vehiculo.isEliminado === false);
    console.log(filteredVehiculos)
    return filteredVehiculos.map((vehiculo) => ({
      id: vehiculo.id,
      tipo: vehiculo.tipo,
      patente: vehiculo.patente,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      numeroInterno: vehiculo.numeroInterno,
      kilometraje: vehiculo.kilometraje,
      estado: vehiculo.isServicio ? "Vigente" : "Fuera de Servicio",
      fechaMantención: vehiculo.ultimaMantencion !== undefined ? vehiculo.ultimaMantencion : "-"
    }));
  }, [vehiculos]);

  useEffect(() => {
    setList(vehiculosList);
  }, [vehiculosList]);
  // console.log(vehiculosList)
  


  const handlerEdit = (data) => {
    console.log(data);
    setDataSelect(data)
    setOpenModal(true)
    setEdit(true)
  }
  

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
    console.log(utils)

  return (
    <MainContainer titulo={tituloPage}>

      <div className="d-flex justify-content-between align-items-center">
        <div className="h1">{tituloPage}</div>
        <CustomButton icon={Icons.PlusSquare} endIcon={true} typeColor="primary" onClick={() => {
          setOpenModal(true)
          setDataSelect(null)
          setEdit(false)
        }}>Nuevo Vehículo</CustomButton>
        <CustomModal
          titulo="Nuevo Vehículo"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <FormularioCrearVehiculoV  utils={utils} />
          {/* <FormularioCrearRequisito setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} data={dataSelect} edit={edit} /> */}
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
          <TablaVehiculos vehiculos={list} refreshData={refreshData} onEdit={handlerEdit} loadingData={isLoading}/>
      }
    </MainContainer>
  );
}