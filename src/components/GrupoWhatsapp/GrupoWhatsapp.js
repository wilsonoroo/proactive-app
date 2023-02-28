import { useState } from 'react';
import CustomImagenAvatar from '../CustomImagenAvatar';
import * as Icons from 'react-feather';
import './GrupoWhatsapp.scss';
import CustomDivider from '../CustomDivider';
import GrupoUsuarios from '../GrupoUsuarios/GrupoUsuarios';
import MaterialContainer from '../MaterialContainer/MaterialContainer';
import CustomButton from '../CustomButton/CustomButton';
import EnviarMensaje from '../EnviarMensaje/EnviarMensaje';

export default function GrupoWhatsapp({ usuarios, titulo }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <MaterialContainer textoIzquierda={titulo} >
      {
        isCollapsed ?
          <div>
            <div onClick={() => setIsCollapsed(false)} className="container-img-avatar_grupo-usuarios">
              <GrupoUsuarios usuarios={usuarios} />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <CustomButton typeColor="calipso" icon={Icons.MessageCircle} endIcon={true} >Enviar</CustomButton>
            </div>
          </div>
          :
          <div className="d-flex flex-column">
            {
              usuarios.map((element, index) => {
                return <GrupoWhatsappItem key={index} />
              })
            }
            <CustomDivider />
            <div className="container-total-cantidad_grupo-whatsapp">{`Total de ${usuarios.length} agregados de ${usuarios.length} requeridos`}</div>
            <div className="container-boton-chevron_grupo-whatsapp" onClick={() => setIsCollapsed(true)}>
              <Icons.ChevronsUp className='boton-chevron_grupo-whatsapp' />
            </div>
          </div>
      }
    </MaterialContainer>
  );
}

function GrupoWhatsappItem() {
  return (
    <div className="container_grupo-whatsapp-item">
      <div className='item_grupo-whatsapp-item'>
        <CustomImagenAvatar width={50} src="https://mui.com/static/images/avatar/1.jpg" />
        <div className='container-text_grupo-whatsapp-item'>
          <div className="primary-text_grupo-whatsapp-item">Luciano Larama</div>
          <div className="secondary-text_grupo-whatsapp-item">+569 231123123</div>
        </div>
      </div>
      <div className='item_grupo-whatsapp-item'>
        <Icons.CheckSquare className="boton-check_grupo-whatsapp-item" />
        <Icons.Clock className="boton-reloj_grupo-whatsapp-item" />
        <Icons.Trash className="boton-borrar_grupo-whatsapp-item" />
      </div>
    </div>
  )
}