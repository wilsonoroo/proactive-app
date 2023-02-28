import './GrupoUsuarios.scss';
import * as Icons from 'react-feather';

export default function GrupoUsuarios({ usuarios }) {

  const obtenerUsuarios = (usuarios, cantidad) => {
    // usuarios.map((element, index) => {
    //   return (
    //     <img src="https://mui.com/static/images/avatar/1.jpg" className="img-avatar_grupo-usuarios" style={{ left: `${index * 40}px` }} />
    //   )
    // })

    let arregloUsuarios = [];
    for (let i = 0; i < usuarios.length; i++) {
      if (i === cantidad) {
        break;
      }
      const elementoHTML = <img src="https://mui.com/static/images/avatar/1.jpg" alt="imagen-avatar" className="img-avatar_grupo-usuarios" />;
      arregloUsuarios.push(elementoHTML);
    }
    if (usuarios.length !== arregloUsuarios.length) {
      arregloUsuarios.push(
        <div className="boton-cantidad_grupo-usuarios">{`+${usuarios.length - cantidad}`}</div>
      );
    } else {
      arregloUsuarios.push(
        <div className="boton-cantidad_grupo-usuarios"><Icons.ChevronsRight /></div>
      );
    }
    return arregloUsuarios;
  }

  return (
    <div className="container-img-avatar_grupo-usuarios">
      {
        obtenerUsuarios(usuarios, 5).map((element, index) => {
          return <div key={index}>{element}</div>
        })
      }
    </div>
  );
}