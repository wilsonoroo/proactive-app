import PropTypes from "prop-types";
import './SeleccionarTicket.scss';

import CircleFalse from '../../assets/circle-select-false.png';
import CircleTrue from '../../assets/circle-select-true.png';

export function SeleccionarTicket({ isActive = false, nombre }) {
  return (
    <div className={`main_seleccionar-ticket ${isActive ? 'active_seleccionar-ticket' : 'no-active_seleccionar-ticket'}`}>
      <img src={isActive ? CircleTrue : CircleFalse} alt="circle-select-true" />
      {nombre}
    </div>
  );
}

SeleccionarTicket.propTypes = {
  isActive: PropTypes.bool,
  nombre: PropTypes.any
}

