import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import './CustomTabs.scss';

export default function CustomTabs({ items, setItemSelected, itemSelected }) {
  const navigate = useNavigate();

  const handleSelect = (item) => {
    setItemSelected(item.hash);
    navigate(item.hash, { replace: true });
  }

  return (
    <div className='main_custom-tabs'>
      {
        items.map((item, index) => {
          return <div key={index} className={`tab_custom-tabs ${itemSelected === item.hash ? 'tab-selected_custom-tabs' : 'tab-unselected_custom-tabs'}`} onClick={() => itemSelected !== item.hash && handleSelect(item)}>{item.nombre}</div>
        })
      }
    </div>
  );
}
CustomTabs.propTypes = {
  itemSelected: PropTypes.any,
  items: PropTypes.shape({
    map: PropTypes.func
  }),
  setItemSelected: PropTypes.func
}
