import PropTypes from "prop-types";
import './MaterialContainerDocumento.scss';

export default function MaterialContainerDocumento({ children, textoIzquierda, textoDerecha, isVencido = false }) {
  return (
    <div className={`main_material-container-documento ${isVencido ? "color-danger" : "color-primary"}`}>
      <div className="body_material-container-documento">
        <div className={`texto-izquierda_material-container-documento ${textoIzquierda === null && 'invisible'}`}>{textoIzquierda}</div>
        <div className={`texto-derecha_material-container-documento ${textoIzquierda === null && 'invisible'}`}>{textoDerecha}{textoDerecha !== null && <div className={`dot_material-container-documento ${isVencido ? "dot-rojo_material-container-documento" : "dot-calipso_material-container-documento"}`} />}</div>
        {children}
      </div>
    </div>
  );
}
MaterialContainerDocumento.propTypes = {
  children: PropTypes.any,
  isVencido: PropTypes.bool,
  textoDerecha: PropTypes.any,
  textoIzquierda: PropTypes.any
}
