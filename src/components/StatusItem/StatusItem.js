import PropTypes from "prop-types";
import * as Icons from 'react-feather';
import './StatusItem.scss';

export default function StatusItem({ typeColor }) {
  return (
    <div className={`d-inline-flex ${typeColor === "rojo" && 'container-status-item-red'} ${typeColor === "amarillo" && 'container-status-item-yellow'} ${typeColor === "verde" && 'container-status-item-green'}`}>
      <Icons.Check color='white' size={20} />
    </div>
  );
}
StatusItem.propTypes = {
  typeColor: PropTypes.string
}
