import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { obtenerPersonaPorCargolApi } from "../../../api/personal/personal";
import { addUsuarioAsolicitud } from "../../../api/solicitudes/solicitud";
import useFetch from "../../../hooks/useFetch";
import { calcularEstado, checkVarible, procesarEstadoDocs } from "../../../utils/functions";
import CustomInput from "../../CustomInputs/CustomInput";
import CustomSelect from "../../CustomInputs/CustomSelect";
import Loading from "../../Loading";
import MaterialContainer from "../../MaterialContainer/MaterialContainer";
import UsuarioAsignar from "../../UsuarioAsignar/UsuarioAsignar";

export default function ListaAsignar({ cargosSolicitados, solicitud, refresh, documentos, usuariosAsignados }) {

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [cargoAsignado, setCargoAsignado] = useState("");
  const [listadoPersonal, setListadoPersonal] = useState([])
  const [listadoCargos, setListadoCargos] = useState(cargosSolicitados)
  const [indexLoading, setIndexLoading] = useState(-1)



  const { data: personalApi, firstLoading, refreshData } = useFetch(() => obtenerPersonaPorCargolApi(cargoAsignado.valor));

  const [personal, setPersonal] = useState(personalApi)



  useEffect(() => {

    let filterCargos = cargosSolicitados.filter(cargo => {

      let result = solicitud.personalSolicitadoCargo.find(function (c) {

        return c.cargo._id === cargo.valor;
      })
      if (checkVarible(result)) {

        return result.cantidad > result.personal.length
      }
      return false
    })
    // console.log("cargosSolicitados cambio", listadoCargos[0])

    setListadoCargos(filterCargos)


  }, [cargosSolicitados])

  useEffect(() => {
    refreshData()
  }, [cargoAsignado])


  useEffect(() => {
    setPersonal(personalApi)
    refresh()
  }, [personalApi])

  useEffect(() => {

    if (personalApi.length !== 0 && personalApi !== null) {
      let usuarios = []
      const personasFiltradas = listadoCargos.filter(obj => {
        return obj.hasOwnProperty("personal");
      }).map(obj => obj.personal)
        .reduce((ac, val) => ac.concat(val), [])



      const filtrado2 = personal.filter(personaFiltrada => {
        let result2 = !usuariosAsignados.some(per => per._id === personaFiltrada._id)


        let result = !listadoCargos.some(personaOriginal => {
          return personaOriginal.personal.some(per => per._id === personaFiltrada._id)
        });
        console.log(result, result2)

        return result2
      });

      const filtrado = personalApi.filter(personaFiltrada => {
        let result2 = !usuariosAsignados.some(per => per._id === personaFiltrada._id)


        let result = !listadoCargos.some(personaOriginal => {
          return personaOriginal.personal.some(per => per._id === personaFiltrada._id)
        });

        return result2
      });

      filtrado.map((item) => {
        let result = procesarEstadoDocs(item, documentos)

        let perPerfilCompletado = calcularEstado(result)
        usuarios.push({ ...item, docsParaVerificar: result, perPerfilCompletado: perPerfilCompletado })
      })

      setListadoPersonal(usuarios)
    } else {
      setListadoPersonal([])

    }
  }, [personal, listadoCargos])

  const handleAddUser = async (user, index) => {
    setIndexLoading(index);
    const response = await addUsuarioAsolicitud(cargoAsignado.solicitudCargoAsignado, user._id)
    // console.log(response.status)
    if (response.status === 200) {
      refresh()
      refreshData()
      // setCargoAsignado({ valor: null, solicitudCargoAsignado: null })
    }
    setIndexLoading(-1);

  }

  const handlerChangeCargo = (e) => {
    console.log(e.target.value)
    let solicitudPersonal = solicitud.personalSolicitadoCargo.filter((item) => {
      return item.cargo._id === e.target.value;
    })

    //setSolicitudCargoAsignado(solicitudPersonal[0]._id)
    setCargoAsignado({ valor: e.target.value, solicitudCargoAsignado: solicitudPersonal[0]._id })
  }
  return (
    <div className='row mt-3'>
      {/* COLUMNA IZQUIERDA */}
      <div className='col-12'>
        <MaterialContainer textoIzquierda="Lista de trabajadores a asignar" >
          <div className='row mt-2 d-flex align-items-center'>
            <div className='col-4'>
              <CustomSelect name="cargoAsignado" onChange={handlerChangeCargo} label="Cargo para Asignar" listaItems={listadoCargos} />
            </div>
            <div className='col-8'>
              <CustomInput placeholder="Ingresa RUT o nombre del usuario que buscas" value={inputSearchValue} onChange={(e) => setInputSearchValue(e.target.value)} />
            </div>
          </div>
          {listadoPersonal.length < 0 ? <Grid pt={5}><Loading /></Grid> :
            <div className="col-12 mt-3">
              <div className='d-flex flex-wrap'>
                {
                  listadoPersonal.map((element, index) => {
                    return (
                      <UsuarioAsignar key={index}
                        usuario={element}
                        loadingAddUser={index === indexLoading}
                        onAddUser={(user) => handleAddUser(user, index)} />
                    )
                  })
                }
              </div>
            </div>}
        </MaterialContainer>
      </div>

      {/* COLUMNA DERECHA */}
      {/* <div className='col-3'>
        <GrupoTrabajador usuarios={dataCargoAsignar} titulo="Mecanicos Agregados" />
      </div> */}
    </div>
  );
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