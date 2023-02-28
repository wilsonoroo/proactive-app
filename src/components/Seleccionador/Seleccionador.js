import { useEffect, useState } from 'react';
import MaterialContainer from "../MaterialContainer/MaterialContainer";
import { SeleccionarTicket } from "../SeleccionarTicket/SeleccionarTicket";
import './Seleccionador.scss';

export default function Seleccionador({ titulo, valores, setValores, onClickFaena }) {

  const cambiarEstado = (index) => {
    onClickFaena(valores[index], index)
    setValores(valores.map((valorMap, indexMap) => {
      if (indexMap === index) {
        return { ...valorMap, estado: !valorMap.estado }
      }
      return valorMap;
    }));

  }

  const [seleccionarTodo, setSeleecionarTodo] = useState(false);



  useEffect(() => {
    if (valores.every((element, index) => element.estado === true)) {
      setSeleecionarTodo(true);
    } else {
      setSeleecionarTodo(false);
    }
  }, [valores]);

  return (
    <>
      <MaterialContainer textoIzquierda={titulo} isScrollable={true}>
        {
          valores.map((valor, index) => {
            return (
              <div key={index} className="seleccionar_seleccionador" onClick={() => cambiarEstado(index)}>
                <SeleccionarTicket isActive={valor.estado} nombre={valor.nombre} />
              </div>
            );
          })
        }

      </MaterialContainer>
    </>
  );
}