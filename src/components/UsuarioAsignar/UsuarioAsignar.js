import UsuarioCard from '../UsuarioCard/UsuarioCard';
import './UsuarioAsignar.scss';

export default function UsuarioAsignar({ usuario, isContainer = true, onAddUser, loadingAddUser = false }) {

  return (
    <div className='container_usuario-asignar'>
      <UsuarioCard usuario={usuario} onAddUser={onAddUser} loadingAddUser={loadingAddUser} />
    </div>
  );
}
