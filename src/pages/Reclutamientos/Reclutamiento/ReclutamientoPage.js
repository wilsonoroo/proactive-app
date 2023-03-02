import { useEffect, useState } from "react";
import * as Icons from 'react-feather';
import { Navigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomDivider from "../../../components/CustomDivider";
import CustomTabs from "../../../components/CustomTabs.js/CustomTabs";
import DetallesEstadoReclutamiento from "../../../components/DetallesEstadoReclutamiento/DetallesEstadoReclutamiento";
import Loading from "../../../components/Loading";
import ListaAsignar from "../../../components/Reclutamientos/Reclutamiento/ListaAsignar";
import ListaMensajeria from "../../../components/Reclutamientos/Reclutamiento/ListaMensajeria";
import ListaValidar from "../../../components/Reclutamientos/Reclutamiento/ListaValidar";
import useFetch from "../../../hooks/useFetch";
import MainContainer from "../../../layouts/MainContainer";
import { obtenerRequisitosPorFAena } from "../../../services/requisitos/requisitos";
import { actualizarSoicitudReclutamiento, obtenerSolicitudApi } from "../../../services/solicitudes/solicitud";
import { calcularEstado, calcularTotaVerificados, procesarEstadoDocs } from "../../../utils/functions";

export default function ReclutamientoPage() {
  let tituloPage = "Reclutamiento";
  const params = useParams();
  const { id: idParams } = params;

  const { data: reclutamiento, firstLoading, refreshData } = useFetch(() => obtenerSolicitudApi(idParams));
  const {
    data: documentos,
    firstLoading: firstLoadingDocumentos,
    refreshData: refreshDataDocumentos
  } = useFetch(() => obtenerRequisitosPorFAena(reclutamiento.faena?._id));


  const [cargosSolicitados, setCargosSolicitados] = useState([])
  const [cantidadTotal, setCantidadTotal] = useState(0)
  const [cantidadTotalVerificados, setCantidadTotalVerificados] = useState(0)
  const [listadoUsuariosSelect, setListadoUsuariosSelect] = useState([])


  useEffect(() => {
    console.log(documentos)
    if (documentos.length === 0) {
      refreshDataDocumentos()
    }
    console.log(reclutamiento.length !== 0 && reclutamiento !== null)
    if (reclutamiento.length !== 0 && reclutamiento !== null && documentos.length !== 0) {
      console.log("reclutamiento cambio")
      let usuarios = []
      let cantidadTotal = 0
      let cargos = reclutamiento.personalSolicitadoCargo.map((item) => {
        cantidadTotal += item.cantidad
        console.log("cantidadTotal", cantidadTotal)
        let cantidadAcreditada = 0;
        item.personal = item.personal.map((usuario) => {
          let result = procesarEstadoDocs(usuario, documentos)
          let perPerfilCompletado = calcularEstado(result)
          if (perPerfilCompletado === 1) {
            cantidadAcreditada += 1
          }
          let user = {
            ...usuario,
            docsParaVerificar: result,
            perPerfilCompletado: perPerfilCompletado,
            cargoAsignado: item.cargo.nombre,
            idCargoAsignado: item.cargo._id,
            idSolicitudPersonal: item._id
          }
          usuarios.push(user)
          return user;
        })

        return {
          cargo: item.cargo,
          nombre: item.cargo?.nombre,
          valor: item.cargo?._id,
          cantidad: item.cantidad,
          personal: item.personal,
          cantidadAcreditada: cantidadAcreditada
        }
      })


      let cargosFilter = cargos.filter(item => {
        console.log(item)
        return item.cantidad >= 1
      })
      setCargosSolicitados(cargosFilter)
      setCantidadTotal(cantidadTotal)
      setCantidadTotalVerificados(calcularTotaVerificados(usuarios))
      console.log(usuarios)
      setListadoUsuariosSelect(usuarios)

    }


  }, [documentos])


  /**
   * 
   */
  useEffect(() => {
    refreshDataDocumentos()

  }, [reclutamiento])


  const [itemSelected, setItemSelected] = useState(categorias[0].hash);

  const handlerCerrarProceso = async () => {
    console.log()
    const response = await actualizarSoicitudReclutamiento({ ...reclutamiento, estado: "finalizados" })
    if (response.status === 200) {
      Navigate("/reclutamientos", { replace: true });
    }
  }



  if (firstLoading) {
    return <Loading />
  } else {
    tituloPage = reclutamiento.nombre;
    return (
      <MainContainer titulo={tituloPage}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start">
            <div className="h1 me-3">{tituloPage}</div>
            <CustomTabs items={categorias} setItemSelected={setItemSelected} itemSelected={itemSelected} />

          </div>

          <div className="d-flex justify-content-end">
            <div className="h1 me-3">{reclutamiento.rol}</div>
            <CustomButton typeColor="primary" icon={Icons.ChevronsRight} endIcon={true}
              onClick={handlerCerrarProceso}>
              Cerrar Proceso Reclutamiento
            </CustomButton>
          </div>
        </div>
        <CustomDivider />

        {/* Estado del proyecto */}
        <DetallesEstadoReclutamiento cargosSolicitados={cargosSolicitados} detalles={reclutamiento?.personalSolicitadoCargo} cantidadTotal={cantidadTotal} cantVerificados={cantidadTotalVerificados} />


        {/* Lista de trabajadores a asignar */}
        {
          itemSelected === "#asignar" && <ListaAsignar solicitud={reclutamiento} documentos={documentos} refresh={refreshData} cargosSolicitados={cargosSolicitados} usuariosAsignados={listadoUsuariosSelect} />
        }

        {/* Lista de trabajadores a asignar */}
        {
          itemSelected === "#validar" && <ListaValidar solicitud={reclutamiento} cargosSolicitados={cargosSolicitados} refresh={refreshData} documentos={documentos} usuarios={listadoUsuariosSelect} data={dataEstado} />
        }

        {/* Lista de trabajadores a asignar */}
        {
          itemSelected === "#mensajeria" && <ListaMensajeria usuarios={dataCargoAsignar} />
        }

      </MainContainer>
    );
  }
}

const dataCargoAsignar = [
  {
    nombre: "Eren Jeager",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    email: "eren@gmail.com",
    progreso: 0.4,
    id: "102301231d23",
    feliz: true
  },
  {
    nombre: "Mikasa Ackerman",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    email: "eren@gmail.com",
    progreso: 0.4,
    id: "1023012a3123",
    feliz: true
  },
  {
    nombre: "Eren Jeager",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    email: "eren@gmail.com",
    progreso: 0.4,
    id: "1023011223123",
    feliz: true
  },
  {
    nombre: "Luciano Larama",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    email: "luciano@gmail.com",
    progreso: 0.9,
    id: "102301awdaa23123",
    feliz: false
  },
  {
    nombre: "Javier Malebran",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    email: "javier@gmail.com",
    progreso: 0.2,
    id: "102301awd23123",
    feliz: false
  },
  {
    nombre: "Alexis Solis",
    imagen: "https://laverdadnoticias.com/__export/1648672855178/sites/laverdad/img/2022/03/30/cumpleanos_eren_jeager_shingeki_no_kyojin_attack_on_titan.jpg_410945991.jpg",
    email: "eren@gmail.com",
    progreso: 1,
    id: "102301wd23123",
    feliz: true
  }
]


const dataEstado = [
  { status: "rojo", cargoRequerido: "Supervisor Mecánico", cantidadTotal: 3, cantidadActual: 2, cantidadAcreditados: 2 },
  { status: "amarillo", cargoRequerido: "Supervisor Eléctrico", cantidadTotal: 2, cantidadActual: 3, cantidadAcreditados: 2 },
  { status: "rojo", cargoRequerido: "Asesor Prevención Riesgo", cantidadTotal: 0, cantidadActual: 2, cantidadAcreditados: 2 },
  { status: "verde", cargoRequerido: "Capataz Mecánico", cantidadTotal: 0, cantidadActual: 2, cantidadAcreditados: 0 },
  { status: "amarillo", cargoRequerido: "Capataz Eléctrico", cantidadTotal: 0, cantidadActual: 2, cantidadAcreditados: 0 },
]

const categorias = [
  { nombre: "Asignar", hash: "#asignar" },
  { nombre: "Validar", hash: "#validar" },
  { nombre: "Mensajería", hash: "#mensajeria" }
]

const documentosData = [
  {
    nombre: "Documentos", hash: "#documentos", documentos: [
      {
        tipoDocumento: "Carnet de Identidad",
        archivo: {
          nombre: "carnet_identidad.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      },
      {
        tipoDocumento: "Papel de Antecedentes",
        archivo: {
          nombre: "papel_antecedentes.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      },
      {
        tipoDocumento: "Certificado de Estudios",
        archivo: null
      },
      {
        tipoDocumento: "Finiquito",
        archivo: {
          nombre: "finiquito.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      },
    ]
  },
  {
    nombre: "Licencias", hash: "#licencias", documentos: [
      {
        tipoDocumento: "Curriculum",
        archivo: {
          nombre: "curriculum.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      },
      {
        tipoDocumento: "Preocupacional",
        archivo: {
          nombre: "curriculum.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      }
    ]
  },
  {
    nombre: "Exámentes", hash: "#examentes", documentos: [
      {
        tipoDocumento: "Preocupacional",
        archivo: {
          nombre: "examen_preocupacional.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      }
    ]
  },
  {
    nombre: "Epp", hash: "#epp", documentos: [
      {
        tipoDocumento: "Preocupacional",
        archivo: {
          nombre: "examen_preocupacional.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      }
    ]
  },
  {
    nombre: "Cursos", hash: "#cursos-y-capacitaciones", documentos: [
      {
        tipoDocumento: "Preocupacional",
        archivo: {
          nombre: "examen_preocupacional.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      },
      {
        tipoDocumento: "Certificado de Ingles",
        archivo: {
          nombre: "certificado_ingles.pdf",
          fecha: "01/06/22",
          url: "https://www.facebook.com/",
        }
      }
    ]
  },
]