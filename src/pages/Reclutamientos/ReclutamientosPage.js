import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { obtenerRequisitosPorFAena } from "../../api/requisitos/requisitos";
import { obtenerSolicitudesApi } from "../../api/solicitudes/solicitud";
import CustomDivider from "../../components/CustomDivider";
import CustomTabs from "../../components/CustomTabs.js/CustomTabs";
import Loading from "../../components/Loading";
import AgregarReclutamiento from "../../components/Reclutamientos/AgregarReclutamiento";
import TablaReclutamientos from "../../components/Reclutamientos/TablaReclutamientos";
import useFetch from "../../hooks/useFetch";
import MainContainer from "../../layouts/MainContainer";
import { calcularEstado, calcularTotaVerificados, procesarEstadoDocs } from "../../utils/functions";

export default function ReclutamientosPage() {
  const tituloPage = "Reclutamientos";
  const location = useLocation();

  const [itemSelected, setItemSelected] = useState(location.hash !== "" ? location.hash : categorias[0].hash);
  const [listaReclutamiento, setListaReclutamiento] = useState([])

  const { data: reclutamientos, firstLoading, refreshData } = useFetch(() => obtenerSolicitudesApi());


  const laodRequisitos = async (id) => {
    let response = await obtenerRequisitosPorFAena(id)
    let documentos = await response.json()
    return documentos
  }
  useEffect(() => {
    if (reclutamientos !== null) {
      let mapping = reclutamientos.map(async (reclutamiento) => {
        let documentos = await laodRequisitos(reclutamiento.faena?._id)

        let usuarios = []
        let cantidadTotal = 0
        let cargos = reclutamiento.personalSolicitadoCargo.map((item) => {
          cantidadTotal += item.cantidad
          item.personal.map((usuario) => {
            let result = procesarEstadoDocs(usuario, documentos)
            let perPerfilCompletado = calcularEstado(result)
            usuarios.push({ ...usuario, docsParaVerificar: result, perPerfilCompletado: perPerfilCompletado, cargoAsignado: item.cargo.nombre, idCargoAsignado: item.cargo._id })
          })


          return {
            cargo: item.cargo,
            nombre: item.cargo.nombre,
            valor: item.cargo._id,
            cantidad: item.cantidad,
          }
        })
        return {
          ...reclutamiento,
          cantPersonalAcreditado: calcularTotaVerificados(usuarios),
          cantPersonalSolicitado: cantidadTotal,
          perAvance: (calcularTotaVerificados(usuarios) / cantidadTotal)
        }
      })
      Promise.all(mapping).then(result => {
        setListaReclutamiento(result)
      })


    }

  }, [reclutamientos])



  const dataFilters = (e) => {
    if (itemSelected === "#pendientes") {
      if (e.estado === "pendientes" && e.isEliminado === false) {
        return true;
      } else {
        return false;
      }
    } else if (itemSelected === "#finalizados") {
      if (e.estado === "finalizados" && e.isEliminado === false) {
        return true;
      } else {
        return false;
      }
    } else {
      if (e.isEliminado === true) {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    let dataFiltrada = reclutamientos.filter((elemento) => dataFilters(elemento))

    setListaReclutamiento(dataFiltrada)
  }, [reclutamientos])

  return (
    <MainContainer titulo={tituloPage}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start">
          <div className="h1 me-3">{tituloPage}</div>
          <CustomTabs items={categorias} setItemSelected={setItemSelected} itemSelected={itemSelected} />
        </div>
        <div className="d-flex justify-content-end">
          <AgregarReclutamiento refreshData={refreshData} />
        </div>
      </div>
      <CustomDivider />
      {
        firstLoading ?
          <Loading />
          :
          <TablaReclutamientos key={"tablas-reclutamientos"}
            reclutamientos={listaReclutamiento.filter((elemento) => dataFilters(elemento))}
            refreshData={refreshData} />
      }
    </MainContainer>
  );
}

const categorias = [
  { nombre: "Pendientes", hash: "#pendientes" },
  { nombre: "Finalizados", hash: "#finalizados" },
  { nombre: "Eliminados", hash: "#eliminados" }
]