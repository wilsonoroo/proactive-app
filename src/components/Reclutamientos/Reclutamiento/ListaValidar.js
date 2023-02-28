import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUsuarioAsolicitud } from "../../../api/solicitudes/solicitud";
import CustomSelect from "../../CustomInputs/CustomSelect";
import MaterialContainer from "../../MaterialContainer/MaterialContainer";
import UsuarioValidar from "../../UsuarioValidar/UsuarioValidar";

export default function ListaValidar({ solicitud, usuarios, cargosSolicitados, refresh }) {

  const navigate = useNavigate();
  const [inputSearchValue, setInputSearchValue] = useState(null);
  const [listaUsuarios, setListaUsuarios] = useState(usuarios);


  useEffect(() => {
    setListaUsuarios(usuarios)
    filterUser(inputSearchValue)
  }, [usuarios])

  console.log(solicitud, cargosSolicitados)
  const handlerCnhangeCargo = (e) => {

    filterUser(e.target.value)
    setInputSearchValue(e.target.value)

  }
  const filterUser = (idCargo) => {
    if (idCargo !== null) {
      let filterUser = usuarios.filter(item => {
        return item.idCargoAsignado === idCargo
      })
      setListaUsuarios(filterUser)
    }
  }


  const handleEliminar = async (user) => {
    console.log(user, solicitud, cargosSolicitados)
    const response = await deleteUsuarioAsolicitud(user.idSolicitudPersonal, user._id)
    if (response.status === 200) {
      refresh()
    }
  }


  return (
    <>

      <div className='row mt-3'>
        <div className='col-12'>
          <MaterialContainer textoIzquierda="Lista de trabajadores Agregados" >
            <div className='row mt-2 d-flex align-items-center'>
              <div className='col-3'>
                <CustomSelect name="responsableDeAcreditacion" label="Cargo para Asignar" listaItems={cargosSolicitados} onChange={handlerCnhangeCargo} />
              </div>
            </div>
            {
              listaUsuarios.map((element, index) => {

                return (
                  <UsuarioValidar key={index} usuario={element} onDeleteUser={handleEliminar} idFaena={solicitud.faena._id} solicitud={solicitud} />
                )
              })
            }
          </MaterialContainer>
        </div>
      </div>
    </>

  );
}
