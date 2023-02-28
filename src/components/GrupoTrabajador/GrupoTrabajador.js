import { useState } from 'react';
import CustomImagenAvatar from '../CustomImagenAvatar';
import * as Icons from 'react-feather';
import './GrupoTrabajador.scss';
import CustomDivider from '../CustomDivider';
import GrupoUsuarios from '../GrupoUsuarios/GrupoUsuarios';
import MaterialContainer from '../MaterialContainer/MaterialContainer';

export default function GrupoTrabajador({ usuarios, titulo }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <MaterialContainer textoIzquierda={titulo} >
      {
        isCollapsed ?
          <div onClick={() => setIsCollapsed(false)} className="container-img-avatar_grupo-usuarios">
            <GrupoUsuarios usuarios={usuarios} />
          </div>
          :
          <div className="d-flex flex-column">
            <div className="d-flex flex-wrap">
              {
                usuarios.map((element, index) => {
                  return (
                    <div key={index} className="d-flex align-items-center px-3">
                      <CustomImagenAvatar width={50} src="https://mui.com/static/images/avatar/1.jpg" />
                      <div className="ms-2">Luciano Larama</div>
                      <Icons.Trash className="ms-2" color="red" />
                    </div>
                  )
                })
              }
            </div>
            <CustomDivider />
            <div className="text-center">Total de 15 agregados de 20 requeridos</div>
            <div className="d-flex justify-content-center mt-2" onClick={() => setIsCollapsed(true)}>
              <Icons.ChevronsUp />
            </div>
          </div>
      }
    </MaterialContainer>
  );
}