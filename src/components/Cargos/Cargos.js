import * as Icons from 'react-feather';
import './Cargos.scss';
import { SeleccionarTicket } from '../SeleccionarTicket/SeleccionarTicket';

export default function Cargos({ data, handleChangeCargos }) {
  return (
    <div>
      {
        data.map((elemento, index) => {
          return (
            <div
              key={index}
              className="seleccionable_cargos"
              onClick={() => {
                let nuevaData = [...data];
                nuevaData[index] = { nombre: elemento.nombre, isActive: !elemento.isActive };
                handleChangeCargos(nuevaData);
              }}>
              <SeleccionarTicket
                isActive={elemento.isActive}
                nombre={elemento.nombre}
              />
            </div>
          )
        })
      }
    </div>
  );
}

// export function Cargo({isActive= false, nombre}){
//   return(
//     <div className={`main_cargo ${isActive ? 'active_cargo' : 'no-active_cargo'}`}>
//       <img src={isActive ? CircleTrue : CircleFalse} alt="circle-select-true" />
//       {nombre}
//     </div>
//   );
// }