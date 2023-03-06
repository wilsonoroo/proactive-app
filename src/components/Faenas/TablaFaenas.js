import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDivider from "../CustomDivider";
import CustomInput from "../CustomInputs/CustomInput";
import CustomMaterialTable from "../CustomMaterialTable/CustomMaterialTable";

export default function TablaFaenas({ faenas, refreshData, onDelete, loadingData }) {
  // console.log('TablaFaenas');
  const navigate = useNavigate();

  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });  
  const [inputSearchValue, setInputSearchValue] = useState(null);
  const [dataFaenas, setDataFaenas] = useState({ data: [], loading: false });

  useEffect(() => {
    setDataFaenas({ data: faenas, loading: loadingData })
  }, [faenas])

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
      setDataFaenas({ ...dataFaenas, loading: true })
      let dataResult = await asyncFilter(faenas, dataFilters);
      // console.log("=>>filterV", dataResult)
      setDataFaenas({ data: dataResult, loading: false })
    }
  }


  const dataFilters = (e) => {
    if (inputSearchValue.length !== 0) {
      if (e.nombre || e.region || e.abreviatura) {
        if (e.nombre.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.region.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.abreviatura.toLowerCase().includes(inputSearchValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    }
    return true
  }






  const handleEliminar = (idUsuario) => {
    onDelete(idUsuario)

  }

  const headerFaenas = [
    {
      id: 'nombre',
      disablePadding: false,
      label: 'Nombre Faena',
      type: "string"
    },
    {
      id: 'region',
      disablePadding: false,
      label: 'Región',
      type: "string"
    },
    {
      id: 'comuna',
      disablePadding: false,
      label: 'Comuna',
      type: "string"
    },
    {
      id: 'abreviatura',
      disablePadding: false,
      label: 'Abreviatura',
      type: "string"
    },
    {
      id: 'tipoFaena',
      disablePadding: false,
      label: 'Tipo Faena',
      type: "string"
    },
    {
      id: 'isVigente',
      disablePadding: false,
      label: 'Estado',
      type: "bool"
    },
    // {
    //   id: 'isEliminado',
    //   disablePadding: false,
    //   label: 'E',
    //   type: "bool"
    // },
    {
      id: '_id',
      disablePadding: false,
      label: 'Acciones',
      type: "acciones",
      acciones: [
        {
          type: "delete",
          function: (id) => console.log("delete", id)
        },
        // {
        //   type: "view",
        //   function: (id) => navigate(`./${id._id}`)
        // }
      ]
    }
  ];

  return (
    <div>
      <div className="d-flex flex-column">
        <CustomInput placeholder="Ingrese Nombre o abreviatura de Faena" inputSearchValue={inputSearchValue} setInputSearchValue={setInputSearchValue} />
        <CustomDivider />
        <CustomMaterialTable
          handleEliminar={handleEliminar}
          headerData={headerFaenas}
          data={dataFaenas.data}
        />
      </div>
    </div>
  );
}

