import { useState } from "react";
import * as Icons from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { cambiarEstadoUsuarioApi } from "../../services/usuariosAPI";
import CustomButton from "../CustomButton/CustomButton";
import CustomDivider from "../CustomDivider";
import CustomInput from "../CustomInputs/CustomInput";
import CustomMaterialTable from "../CustomMaterialTable/CustomMaterialTable";
import CustomModalMensaje from "../CustomModalMensaje/CustomModalMensaje";

export default function TablaRequisitos({ usuarios, refreshData, onEdit = null }) {
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });

  const navigate = useNavigate();

  const [inputSearchValue, setInputSearchValue] = useState("");

  const headerUsuarios = [
    {
      id: 'num',
      disablePadding: false,
      label: '#',
      type: "string"
    },
    {
      id: 'nombre',
      disablePadding: false,
      label: 'Nombre Archivo',
      type: "string"
    },
    {
      id: 'codigo',
      disablePadding: false,
      label: 'Código',
      type: "string"
    },
    {
      id: 'tipoArchivo',
      disablePadding: false,
      label: 'Tipo Archivo',
      type: "string"
    },

    {
      id: 'puedeVencer',
      disablePadding: false,
      label: '¿Caduca?',
      type: "bool"
    },
    {
      id: 'obligatorioAcreditacion',
      disablePadding: false,
      label: '¿Obligatio para acreditar?',
      type: "bool"
    },

    {
      id: 'faenas',
      disablePadding: false,
      label: 'Faenas',
      type: "faenas_view"
    },
    {
      id: 'cargos',
      disablePadding: false,
      label: 'Cargos',
      type: "cargos_view"
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

  const dataFilters = (e) => {
    if (inputSearchValue.length > 1) {
      if (e.nombre.toLowerCase().includes(inputSearchValue.toLowerCase()) || e.tipoArchivo.toLowerCase().includes(inputSearchValue.toLowerCase())) {
        return true;
      }
      return false;
    }
    return true;
  }

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
        <CustomMaterialTable
          handleEliminar={handleEliminar}
          headerData={headerUsuarios}
          data={usuarios.filter((e) => dataFilters(e))}
        />
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
