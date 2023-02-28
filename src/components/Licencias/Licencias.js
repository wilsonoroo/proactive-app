import './Licencias.scss';

export default function Licencias({ dataLicencias, titulo = "", handleChangeLicencias }) {
  return (
    <div>
      {titulo !== "" && <div className='titulo_licencias'>{titulo}</div>}
      <div className='body_licencias'>
        {
          dataLicencias.map((element, index) => {
            return (
              <div
                key={index}
                className="seleccionable_licencias"
                onClick={() => {
                  let nuevaData = [...dataLicencias];
                  nuevaData[index] = { nombre: element.nombre, isActive: !element.isActive };
                  handleChangeLicencias(nuevaData);
                }}>
                <div
                  className={`me-2 fw-bold fs-5 ${(index !== 0 && index !== dataLicencias.length) && 'separador_licencias'} ${!element.isActive && 'desactivar_licencias'}`}
                >
                  {element.nombre}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}