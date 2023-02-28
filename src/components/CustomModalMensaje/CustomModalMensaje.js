import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as Icons from 'react-feather';
import './CustomModalMensaje.scss';

export default function CustomModalMensaje({ openModal, setOpenModal, titulo, children, onClose }) {


  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box minWidth={"800px"} className="container-box-modal-mensaje">
        <div className='container'>
          <div className='d-flex justify-content-end'>
            <div className='boton-cerrar' onClick={onClose}><Icons.X /></div>
          </div>
          <div className='d-flex justify-content-start'>
            <span className='fs-5 fw-bold'>{titulo}</span>
          </div>
          <hr />
          {children}
        </div>
      </Box>
    </Modal>
  );
}
