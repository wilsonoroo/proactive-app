import * as Icons from 'react-feather';
import './ProblemaStatus.scss';
import CaritaFeliz from '../../assets/feliz.png';
import CaritaTriste from '../../assets/triste.png';

export default function ProblemaStatus({ feliz, isActive = false }) {

  const felizMap= {
    true: {
      url: CaritaFeliz,
      texto: "Sin problemas"
    },
    false: {
      url: CaritaTriste,
      texto: "Con problemas"
    }
  }
  return (
    <div className={`main_problema-status ${isActive && 'opacidad_problema-status'}`}>
      <img src={felizMap[feliz].url} alt="circle-select-true"/>
      {felizMap[feliz].texto}
    </div>
  );
}