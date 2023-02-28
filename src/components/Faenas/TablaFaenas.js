import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDivider from "../CustomDivider";
import CustomInput from "../CustomInputs/CustomInput";
import CustomMaterialTable from "../CustomMaterialTable/CustomMaterialTable";

export default function TablaFaenas({ usuarios, refreshData, onDelete }) {
  console.log('TablaFaenas');

  const navigate = useNavigate();

  const [inputSearchValue, setInputSearchValue] = useState("");

  const dataFilters = (e) => {
    if (inputSearchValue.length > 1) {
      if (e.nombre.toLowerCase().includes(inputSearchValue.toLowerCase()) || e.abreviatura.toLowerCase().includes(inputSearchValue.toLowerCase())) {
        return true;
      }
      return false;
    }
    return true;
  }

  const handleEliminar = (idUsuario) => {
    onDelete(idUsuario)

  }

  const headerFaenas = [
    {
      id: 'nombre',
      disablePadding: false,
      label: 'Nombre Faena/Planta Industrial',
      type: "string"
    },
    {
      id: 'abreviatura',
      disablePadding: false,
      label: 'Abreviatura',
      type: "string"
    },
    {
      id: 'ubicacion',
      disablePadding: false,
      label: 'Ubicacion',
      type: "string"
    },
    {
      id: 'responsable',
      disablePadding: false,
      label: 'Responsable de Acreditación',
      type: "responsable_view"
    },
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
          data={usuarios.filter((e) => dataFilters(e))}
        />
      </div>
    </div>
  );
}

const headerFaenas = [
  {
    id: 'nombre',
    disablePadding: false,
    label: 'Nombre Faena/Planta Industrial',
    type: "string"
  },
  {
    id: 'abreviatura',
    disablePadding: false,
    label: 'Abreviatura',
    type: "string"
  },
  {
    id: 'ubicacion',
    disablePadding: false,
    label: 'Acciones',
    type: "acciones"
  },
  {
    id: 'responsable',
    disablePadding: false,
    label: 'Responsable de Acreditación',
    type: "string"
  },

];
