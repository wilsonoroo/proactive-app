import { useEffect, useState } from "react";
import * as Icons from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { cambiarEstadoUsuarioApi } from "../../api/usuariosAPI";
import CustomButton from "../CustomButton/CustomButton";
import CustomDivider from "../CustomDivider";
import CustomInput from "../CustomInputs/CustomInput";
import CustomMaterialTable from "../CustomMaterialTable/CustomMaterialTable";
import CustomModalMensaje from "../CustomModalMensaje/CustomModalMensaje";
import Loading from "../Loading";

export default function TablaRequisitos({ vehiculos, refreshData, onEdit = null, loadingData }) {
  const navigate = useNavigate();
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });  
  const [inputSearchValue, setInputSearchValue] = useState(null);
  const [dataVehiculos, setDataVehiculos] = useState({ data: [], loading: false });

  useEffect(() => {
    setDataVehiculos({ data: vehiculos, loading: loadingData })
  }, [vehiculos])

  useEffect(() => {
    // console.log(inputSearchValue)
    const timer = setTimeout(() => filteredVehiculos(), 1000);
    return () => clearTimeout(timer);
  }, [inputSearchValue])

  const asyncFilter = async (arr, predicate) =>
    arr.reduce(async (memo, e) =>
      [...await memo, ...await predicate(e) ? [e] : []]
      , []);


  const filteredVehiculos = async () => {
    if (inputSearchValue !== null) {
      setDataVehiculos({ ...dataVehiculos, loading: true })
      let dataResult = await asyncFilter(vehiculos, dataFilters);
      // console.log("=>>filterV", dataResult)
      setDataVehiculos({ data: dataResult, loading: false })
    }
  }


  const dataFilters = (e) => {
    if (inputSearchValue.length !== 0) {
      if (e.tipo || e.marca || e.modelo) {
        if (e.tipo.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.marca.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.modelo.toLowerCase().includes(inputSearchValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    }
    return true
  }

  const headerVehiculos = [
    {
      id: 'tipo',
      disablePadding: false,
      label: 'Tipo',
      type: "string"
    },
    {
      id: 'patente',
      disablePadding: false,
      label: 'Patente',
      type: "string"
    },
    {
      id: 'marca',
      disablePadding: false,
      label: 'Marca',
      type: "string"
    },
    {
      id: 'modelo',
      disablePadding: false,
      label: 'Modelo',
      type: "string"
    },
    {
      id: 'numeroInterno',
      disablePadding: false,
      label: 'N° Interno',
      type: "string"
    },
    {
      id: 'kilometraje',
      disablePadding: false,
      label: 'Kilometraje',
      type: "string"
    },
    {
      id: 'estado',
      disablePadding: false,
      label: 'Estado',
      type: "string"
    },
    {
      id: 'fechaMantención',
      disablePadding: false,
      label: 'Ultima Mantención',
      type: "string"
    },

    {
      id: '_id',
      disablePadding: false,
      label: 'Acciones',
      type: "acciones",
      acciones: [
        {
          type: "edit",
          function: onEdit ? onEdit : (id) => { }
        },
        {
          type: "view",
          function: (id) => navigate(`./${id}`)
        }, {
          type: "delete",
          function: (id) => { }
        },
      ]
    }
  ];


  const handleEliminar = (idUsuario) => {
    console.log("handleEliminar")
    setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
    cambiarEstadoUsuarioApi(idUsuario).then((response) => {
      console.log(response);
      if (response?.success === "OK") {
        refreshData();
      }
    });
  }



  return (
    <div>
      <div className="d-flex flex-column">
        <CustomInput placeholder="Ingrese Nombre del documento" inputSearchValue={inputSearchValue} setInputSearchValue={setInputSearchValue} />
        <CustomDivider />
        {
            dataVehiculos.loading ?
              <Loading /> : <CustomMaterialTable
                handleEliminar={handleEliminar}
                headerData={headerVehiculos}
                data={dataVehiculos.data}
                numFila={20}
              />
        }
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
    </div>
  );
}
