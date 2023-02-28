import './SeleccionarTicket.scss';

import CircleTrue from '../../assets/circle-select-true.png';
import CircleFalse from '../../assets/circle-select-false.png';

export function SeleccionarTicket({isActive= false, nombre}){
  return(
    <div className={`main_seleccionar-ticket ${isActive ? 'active_seleccionar-ticket' : 'no-active_seleccionar-ticket'}`}>
      <img src={isActive ? CircleTrue : CircleFalse} alt="circle-select-true" />
      {nombre}
    </div>
  );
}