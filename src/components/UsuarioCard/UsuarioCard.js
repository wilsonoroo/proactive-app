import { CircularProgress, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import * as Icons from 'react-feather';
import { useNavigate } from 'react-router-dom';
import CustomDivider from '../CustomDivider';
import CustomImagenAvatar from '../CustomImagenAvatar';
import CustomProgresoCircular from '../CustomProgresoCircular/CustomProgresoCircular';
import './UsuarioCard.scss';

export default function UsuarioCard({ usuario, onAddUser, loadingAddUser = false }) {
  const navigate = useNavigate();

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
      <div className='primary-text_usuario-card'>{usuario.nombres + " " + usuario.apellidoPaterno}</div>
      <div className='secondary-text_usuario-card'>{usuario.correo}</div>
      <CustomDivider />

      {/* ACCIONES */}

      <div className='d-flex justify-content-between'>

        {loadingAddUser ? <CircularProgress /> : <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => { onAddUser(usuario) }}>
          <Icons.UserPlus color='#0080FF' />
        </IconButton>}
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => { navigate(`/usuarios/${usuario._id}`) }}>
          <Icons.Eye color='#0080FF' />
        </IconButton>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <Icons.MessageSquare color='#0080FF' />
        </IconButton>


      </div>
    </div>
  );
}

UsuarioCard.propTypes = {
  // Puedes declarar que una propiedad es un tipo específico de JS. Por defecto, estas
  // son todas opcionales.
  usuario: PropTypes.object,
  onAddUser: PropTypes.func,
  loadingAddUser: PropTypes.bool,

}