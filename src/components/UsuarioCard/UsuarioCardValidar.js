import { Chip, IconButton } from '@mui/material';
import moment from 'moment';
import * as Icons from 'react-feather';
import { useNavigate } from 'react-router-dom';
import CustomDivider from '../CustomDivider';
import CustomImagenAvatar from '../CustomImagenAvatar';
import CustomProgresoCircular from '../CustomProgresoCircular/CustomProgresoCircular';
import EnviarMensaje from '../EnviarMensaje/EnviarMensaje';
import './UsuarioCard.scss';

export default function UsuarioCardValidar({ usuario, onAddUser, onDeleteUser, idFaena, onViewUser, onMensaje = null, solicitud = null }) {
  const navigate = useNavigate();

  console.log(solicitud)

  return (
    <div className='container_usuario-card'>
      <div className='container-relative_usuario-card'>
        <div className='container-absolute-progreso_usuario-card'>
          <CustomProgresoCircular valor={usuario.perPerfilCompletado} size={1} />
        </div>
        <div className='container-absolute-carita_usuario-card'>
          {!usuario.conProblemas ?
            <img src={"../../../assets/feliz.png"} alt="circle-select-true" width={"30px"} className="me-2 container-absolute-carita" /> :
            <img src={"../../../assets/triste.png"} alt="circle-select-true" width={"30px"} className="me-2 container-absolute-carita" />
          }

        </div>
        <CustomImagenAvatar width={90} src={usuario.imagen} />
      </div>
      <div className='primary-text_usuario-card'>{usuario.nombres}</div>
      <div className='secondary-text_usuario-card'>{usuario.correo}</div>
      <CustomDivider />
      <Chip label={usuario.cargoAsignado} variant="outlined" />
      {/* <Typography variant="caption" >{usuario.cargoAsignado}</Typography> */}


      <CustomDivider />

      {/* ACCIONES */}

      <div className='d-flex justify-content-between'>

        <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => { onDeleteUser(usuario) }}>
          <Icons.Trash color='#FB050C' />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => { onViewUser(usuario._id, idFaena) }}>
          <Icons.Eye color='#0080FF' />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => { onMensaje !== null ?? onMensaje(usuario._id, idFaena) }}>
          {/* <Icons.MessageSquare color='#0080FF' /> */}
          <EnviarMensaje usuario={usuario} proyecto={solicitud.nombreDelProyecto}
            faena={solicitud.faena.noombre} nombre={usuario.nombres} sueldo={"30000"} cargo={""}
            idSolicitud={solicitud._id}
            fecha={moment(solicitud.fechaInicioProyecto).format("DD-MM-YYYY")} />
        </IconButton>


      </div>
    </div>
  );
}