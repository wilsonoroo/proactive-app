import './MaterialContainer.scss';

export default function MaterialContainer({ children, textoIzquierda, textoDerecha, isScrollable = false }) {
  return (
    <div className='main_material-container' style={{ paddingBottom: 40 }}>
      <div className="body_material-container">
        <div className={`texto-izquierda_material-container ${textoIzquierda === null && 'invisible'}`}>{textoIzquierda}</div>
        <div className={`texto-derecha_material-container ${textoIzquierda === null && 'invisible'}`}>{textoDerecha}</div>
        <div className={`${isScrollable && "scroll-children_material-container"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}