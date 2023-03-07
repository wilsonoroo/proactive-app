import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actualizarSoicitudReclutamiento } from "../../services/solicitudes/solicitud";
import CustomDivider from "../CustomDivider";
import CustomDatePicker from "../CustomInputs/CustomDatePicker";
import CustomInput from "../CustomInputs/CustomInput";
import CustomMaterialTable from "../CustomMaterialTable/CustomMaterialTable";

export default function TablaReclutamientos({ reclutamientos, refreshData }) {

  const navigate = useNavigate();

  const [inputSearchValue, setInputSearchValue] = useState("");

  const [inputValues, setInputValues] = useState({ fechaInicio: "", fechaTermino: "" });
  const { fechaInicio, fechaTermino } = inputValues;

  const handleInputChanges = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  }


  const dataFilters = (e) => {
    if (inputSearchValue.length > 2) {
      if (e.nombreDelProyecto.toLowerCase().includes(inputSearchValue.toLowerCase()) || e.faena.nombre.toLowerCase().includes(inputSearchValue.toLowerCase())) {
        return true;
      }
      return false;
    }
    return true;
  }

  const handleEliminar = (idUsuario) => {
    actualizarSoicitudReclutamiento({ _id: idUsuario, isEliminado: true }).then(() => {
      refreshData();
    })

  }

  const headerReclutamientos = [
    {
      id: 'perAvance',
      disablePadding: false,
      label: 'Nombre Proyecto',
      type: "notificacion"
    },
    {
      id: 'perAvance',
      disablePadding: false,
      label: 'Estado',
      type: "porcentaje"
    },
    {
      id: 'nombreDelProyecto',
      disablePadding: false,
      label: 'Nombre Proyecto',
      type: "string"
    },
    {
      id: 'faena',
      disablePadding: false,
      label: 'Faena',
      type: "faena_view"
    },
    {
      id: 'fechaInicioProyecto',
      disablePadding: false,
      label: 'Fecha Inicio Proyecto',
      type: "string"
    },
    {
      id: 'diasParaElInicio',
      disablePadding: false,
      label: 'Dias para Inicio',
      type: "string-date"
    },
    {
      id: 'cantPersonalSolicitado',
      disablePadding: false,
      label: 'Personal Solicitado',
      type: "string"
    },
    {
      id: 'cantPersonalAcreditado',
      disablePadding: false,
      label: 'Personal Acreditado',
      type: "string"
    },
    {
      id: 'responsable',
      disablePadding: false,
      label: 'Responsable',
      type: "responsable_view"
    },
    {
      id: '_id',
      disablePadding: false,
      label: 'Acciones',
      type: "acciones",
      acciones: [
        {
          type: "view",
          function: (data) => navigate(`./${data._id}`)
        },
        {
          type: "whatsapp",
          function: (id) => console.log("whatsapp", id)
        },
        {
          type: "delete",
          function: (id) => console.log("delete", id)
        },
      ]
    }
  ];

  return (
    <div>
      <div className="d-flex flex-column">
        <div className="row align-items-center">
          <div className="col-4 d-flex justify-content-start">
            <CustomDatePicker label="Fecha inicio" name="fechaInicio" className="me-2" value={fechaInicio} onChange={handleInputChanges} />
            <CustomDatePicker label="Fecha termino" name="fechaTermino" value={fechaTermino} onChange={handleInputChanges} />
          </div>
          <div className="col-12 col-lg-8 mt-3 my-lg-0 d-flex justify-content-end">
            <CustomInput placeholder="Busca el resultado que necesitas" inputSearchValue={inputSearchValue} setInputSearchValue={setInputSearchValue} />
          </div>
        </div>
        <CustomDivider />
        <CustomMaterialTable
          handleEliminar={handleEliminar}
          headerData={headerReclutamientos}
          data={reclutamientos.filter((e) => dataFilters(e))}
        />
      </div>
    </div>
  );
}


