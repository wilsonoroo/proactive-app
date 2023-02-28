import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import Slide from '@mui/material/Slide';
import React, { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import './CustomModalFull.scss';

export default function CustomModalFull({ openModal, setOpenModal, titulo, children }) {
  const [open, setOpen] = useState(openModal)
  console.log(open)
  const handleClose = () => setOpen(false);
  const [scroll, setScroll] = React.useState('paper');
  useEffect(() => {
    setOpen(openModal.open)
  }, [])

  useEffect(() => {
    console.log("openModal1", open, openModal)

    setOpen(openModal.open)
  }, [openModal])

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"xl"}
      open={open}

      PaperProps={{
        sx: {
          height: "calc(100% - 64px)"
        }
      }}
      onClose={handleClose}
      scroll={scroll}
      TransitionComponent={Transition}
    >
      <DialogTitle id="scroll-dialog-title">
        <div >
          <div className='d-flex justify-content-end'>
            <div className='boton-cerrar' onClick={handleClose}><Icons.X /></div>
          </div>
          <div className='d-flex justify-content-start'>
            <span className='fs-5 fw-bold'>{titulo}</span>
          </div>
        </div>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        {children}
        <Grid >
        </Grid>
      </DialogContent>


    </Dialog>
    // <Modal
    //   open={openModal}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Box minWidth={"800px"} minHeight={"90vh"} className="container-box">
    //     <div className='container'>
    //       <div className='d-flex justify-content-end'>
    //         <div className='boton-cerrar' onClick={handleClose}><Icons.X /></div>
    //       </div>
    //       <div className='d-flex justify-content-start'>
    //         <span className='fs-5 fw-bold'>{titulo}</span>
    //       </div>
    //       <CustomDivider />
    //       {children}
    //     </div>
    //   </Box>
    // </Modal>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
