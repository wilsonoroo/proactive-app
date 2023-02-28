import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as Icons from 'react-feather';
import CustomDivider from '../CustomDivider';
import './CustomModal.scss';

export default function CustomModal({ openModal, setOpenModal, titulo, children }) {
  const handleClose = () => setOpenModal(false);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock={true}
    >
      <Box minWidth={"800px"} className="container-box">
        <div className='container'>
          <div className='d-flex justify-content-end'>
            <div className='boton-cerrar' onClick={handleClose}><Icons.X /></div>
          </div>
          <div className='d-flex justify-content-start'>
            <span className='fs-5 fw-bold'>{titulo}</span>
          </div>
          <CustomDivider />
          {children}
        </div>
      </Box>
    </Modal>
  );
}
