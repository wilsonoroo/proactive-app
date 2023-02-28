import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDivider from "../CustomDivider";
import CustomInput from "../CustomInputs/CustomInput";
import CustomMaterialTable from "../CustomMaterialTable/CustomMaterialTable";

export default function TablaCargo({ cargos, refreshData, handleEliminar, onEdit }) {
  console.log('TablaFaenas');

  const navigate = useNavigate();

  const [inputSearchValue, setInputSearchValue] = useState("");

  const dataFilters = (e) => {
    if (inputSearchValue.length > 1) {
      if (e.nombre.toLowerCase().includes(inputSearchValue.toLowerCase())) {
        return true;
      }
      return false;
    }
    return true;
  }
    ;



  const headerFaenas = [
    // {
    //   id: 'num',
    //   disablePadding: false,
    //   label: '#',
    //   type: "string"
    // },
    {
      id: 'nombre',
      disablePadding: false,
      label: 'Nombre Cargo',
      type: "string"
    },

    {
      id: 'descripcion',
      disablePadding: false,
      label: 'Descripción Cargo',
      type: "string"
    },

    {
      id: 'faenas',
      disablePadding: false,
      label: 'Faenas',
      type: "faenas_view"
    },

    {
      id: '_id',
      disablePadding: false,
      label: 'Acciones',
      type: "acciones",
      acciones: [
        {
          type: "delete",
          function: (id) => {
            handleEliminar(id)
          }
        },
        {
          type: "edit",
          function: onEdit ? onEdit : (id) => { }
        },
        // {
        //   type: "view",
        //   function: (id) => navigate(`./${id}`)
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
          data={cargos.filter((e) => dataFilters(e))}
        />
      </div>
    </div>
  );
}
