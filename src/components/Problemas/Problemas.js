import ProblemaStatus from '../ProblemaStatus/ProblemaStatus';
import './Problemas.scss';

export default function Problemas({ isProblema, handleChangeProblemas }) {
  return (
    <div className='row'>
      <div className='seleccionable_problemas' onClick={()=> handleChangeProblemas(false)}>
        <ProblemaStatus feliz={true} isActive={isProblema} />
      </div>
      <div className='seleccionable_problemas' onClick={()=> handleChangeProblemas(true)}>
        <ProblemaStatus feliz={false} isActive={!isProblema} />
      </div>
    </div>
  );
}