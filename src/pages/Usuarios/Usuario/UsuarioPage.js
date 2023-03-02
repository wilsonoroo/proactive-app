import { useParams } from "react-router-dom";
import CustomDivider from "../../../components/CustomDivider";
import CustomImagenAvatar from "../../../components/CustomImagenAvatar";
import Licencias from "../../../components/Licencias/Licencias";
import Loading from "../../../components/Loading";
import useFetch from "../../../hooks/useFetch";
import MainContainer from "../../../layouts/MainContainer";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import * as Icons from 'react-feather';
import Cargos from "../../../components/Cargos/Cargos";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomModalMensaje from "../../../components/CustomModalMensaje/CustomModalMensaje";
import Problemas from "../../../components/Problemas/Problemas";
import { obtenerPersonaIndividualApi, updateConSinProblemas, uploadFileApi } from "../../../services/personal/personal";
import { obtenerRequisitosApi } from "../../../services/requisitos/requisitos";
import { groupByTipoArchivo } from "../../../utils/functions";
import DetallesUsuario from "../component/Usuario/DetallesUsuario";
import DocumentosUsuario from "../component/Usuario/DocumentosUsuario";
import FormularioAddCargoFaena from "./FormularioAddCargoFaena";



export default function UsuariosPage() {
  const tituloPage = "Usuarios";
  const params = useParams();

  const { id: idParams } = params;
  const [documentosView, setDocumentosView] = useState(documentosData)
  const [openModal, setOpenModal] = useState(false);
  const [openModalMensaje, setOpenModalMensaje] = useState({
    titulo: "",
    descripcion: "",
    isActive: false,
  });
  const [fotoPerfil, setFotoPerfil] = useState(null);


  const { data: usuario, firstLoading, refreshData } = useFetch(() => obtenerPersonaIndividualApi(idParams));

  const { data: documentos, firstLoading: firstLoadingDocumentos, refreshData: refreshDataDocumentos } = useFetch(() => obtenerRequisitosApi(idParams));

  const handlerEdit = (data) => {
    setOpenModal(true)
  }

  const handleDownloadCompilado = (file => {
    file.blob().then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = `${usuario.nombre}_${usuario.rut}.pdf`;
      a.click();
    });
  })


  useEffect(() => {

    if (documentos !== null && usuario !== null) {

      let groupDocs = groupByTipoArchivo(documentos, "tipoArchivo")
      let setDocsUser = null;
      let documentosUsuario;

      if (usuario.length !== 0) {

        let documento = documentos.find(file => file.codigo === "FT")
        console.log(documento?._id)
        console.log(usuario.requisito)
        let docImagen = usuario.requisito.find(file => file.tipoDocumento === documento?._id)
        console.log(docImagen?.documento?.linkUrl)
        setFotoPerfil(docImagen?.documento?.linkUrl);

        documentosUsuario = usuario.requisito;

        setDocsUser = new Set(documentosUsuario.map(obj => obj._id));

      } else {
        setDocsUser = []
      }
      let arrayDocs = tipoDocuemntos.map(item => {
        let mappingDocs = groupDocs[item.key]?.map(doc => {
          let filterDocs
          let disponible = setDocsUser.length !== 0 ? setDocsUser.has(doc._id) : []
          if (usuario.length !== 0) {
            filterDocs = documentosUsuario.find(item => item._id === doc._id)
            // console.log(filterDocs.fechaVencimiento, new Date(filterDocs.fechaVencimiento).toString(), disponible)
          }


          return {
            documento: typeof filterDocs !== "undefined" ? filterDocs.documento : null,
            tipoDocumento: doc,
            fechaVencimiento: typeof filterDocs !== "undefined" ? new Date(filterDocs.fechaVencimiento) : null,
            disponible: disponible,
            nombre: doc.nombre,
            puedeVencer: doc.puedeVencer
          }
        })
        return {
          tipoArchivo:
          {
            nombre: item.nombre,
            hash: `#${item.key}`,
            documentos: typeof mappingDocs !== 'undefined' ? mappingDocs : []
          },

        }
      })

      setDocumentosView(arrayDocs)
    }
  }, [documentos, usuario])

  const handleUploadFile = async (e) => {
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "file",
      e.target.files[0],
      e.target.files[0].name
    );
    const result = await uploadFileApi(idParams, formData)
  };

  const handleOpenModalFile = () => {
    console.log("onclick")

  }


  const handleChangeProblemas = (data) => {
    console.log('handleChangeProblemas', data);
    updateConSinProblemas(usuario._id, data)
    refreshData()
    // functionUpdateApi(......)

  }

  const handleChangeLicencias = (data) => {
    console.log('handleChangeLicencias', data);
    // functionUpdateApi(......)
    // refreshData
  }

  const handleChangeCargos = (data) => {
    console.log("handleChangeCargos", data);
    // functionUpdateApi(......)
    // refreshData
  }

  const handlerConfirmarServicio = (data) => {

  }

  if (firstLoading) {
    return <Loading />
  } else {
    return (
      <MainContainer titulo={tituloPage}>
        <CustomModal
          titulo="Nuevo Requisito"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <FormularioAddCargoFaena setOpenModalMensaje={setOpenModalMensaje} setOpenModal={setOpenModal} refreshData={refreshData} data={usuario} />
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
        <div className="d-flex justify-content-start align-items-center">
          <div className="h1">{usuario.nombre}</div>
        </div>

        <CustomDivider />
        <div className="row">

          {/* COLUMNA IZQUIERDA */}
          <div className="col-2">

            {
              fotoPerfil !== null ?
                <CustomImagenAvatar src={fotoPerfil} /> :
                <CustomImagenAvatar letras={`${usuario.nombres.split(' ')[0][0].toUpperCase()}`} />
            }
            {/* CON PROBLEMAS Y SIN PROBLEMAS */}
            <div className="my-3">
              <Problemas isProblema={usuario.conProblemas} handleChangeProblemas={handleChangeProblemas} />
            </div>

            {/* LICENCIAS */}
            <CustomDivider />
            <Licencias dataLicencias={dataLicencias} titulo="Licencias de Manejo" handleChangeLicencias={handleChangeLicencias} />
            <CustomDivider />

            {/* CARGOS */}
            <div className="my-3">
              <Cargos data={usuario.cargosCompatibles} handleChangeCargos={handleChangeCargos} />
              <Grid pt={2}>
                <CustomButton icon={Icons.Plus} endIcon={true} typeColor="primary" onClick={handlerConfirmarServicio}>Confirmar Servicio</CustomButton>
              </Grid>
            </div>
            {/* CARGOS */}
            <div className="my-3">
              <Cargos data={usuario.cargosCompatibles} handleChangeCargos={handleChangeCargos} />
              <Grid pt={2}>
                <CustomButton icon={Icons.Plus} endIcon={true} typeColor="primary" onClick={handlerEdit}>Agregar Cargos</CustomButton>
              </Grid>
            </div>

          </div>

          {/* COLUMNA DERECHA */}
          <div className="col-10">
            <DetallesUsuario usuario={usuario} />
            <CustomDivider />

            {/* CONTENIDO DE DOCUMENTOS */}
            <DocumentosUsuario usuario={usuario}
              onDownloadFile={handleDownloadCompilado}
              reload={refreshData} idUser={idParams} documentos={documentosView} onUploadFile={handleUploadFile} onClick={handleOpenModalFile} />
          </div>
        </div>
      </MainContainer>
    );
  }
}

const isProblema = true;

const dataCargos = [
  {
    nombre: "Supervisor Mecanico",
    isActive: false
  },
  {
    nombre: "Supervisor Electrico",
    isActive: true
  },
  {
    nombre: "Capataz Mecanico",
    isActive: true
  },
  {
    nombre: "HSEC",
    isActive: false
  },
  {
    nombre: "Mecanico",
    isActive: true
  },
  {
    nombre: "Electrico",
    isActive: true
  },
  {
    nombre: "Soldador",
    isActive: false
  }
]

const dataLicencias = [
  {
    nombre: "B1",
    isActive: true
  },
  {
    nombre: "A1",
    isActive: false
  },
  {
    nombre: "A2",
    isActive: false
  },
  {
    nombre: "A3",
    isActive: true
  }
]

const tipoDocuemntos = [
  { key: 'documentos', nombre: "Documentos" },
  { key: 'licencia', nombre: "Licencias" },
  { key: 'examenes', nombre: "Exámenes" },
  { key: 'epp', nombre: "Epp" },
  { key: 'curso_capacitacion', nombre: "Curso y Capacitaciones" },
  { key: 'otros', nombre: "Otros" },
]

const documentosData = [
  {
    nombre: "Documentos",
    hash: "#documentos",
    documentos: []
  },
  {
    nombre: "Licencias", hash: "#licencias", documentos: [

    ]
  },
  {
    nombre: "Exámentes", hash: "#examentes", documentos: [
    ]
  },
  {
    nombre: "Epp", hash: "#epp", documentos: [

    ]
  },
  {
    nombre: "Cursos y capacitaciones", hash: "#cursos-y-capacitaciones", documentos: [

    ]
  },
  {
    nombre: "Otros", hash: "#otros", documentos: [

    ]
  },
]