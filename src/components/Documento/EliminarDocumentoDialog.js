
import * as Icons from 'react-feather';
import CustomButton from "../CustomButton/CustomButton";
import CustomModalMensaje from "../CustomModalMensaje/CustomModalMensaje";

export default function EliminarDocumentoDialog({ openModal, setOpenModal, onClickEliminar }) {

    return (
        <div>

            <CustomModalMensaje
                titulo={"Eliminar"}
                onClose={() => {
                    setOpenModal({ ...openModal, isActive: false })
                }}
                openModal={openModal.isActive}
                setOpenModal={setOpenModal.isActive}
            >
                <div>
                    <div className='d-flex justify-content-center'>
                        <div className='d-grep'>
                            <div className='d-flex justify-content-center h3'>{openModal.titulo}</div>
                            <div className='d-flex justify-content-center h5 m-5'>{openModal.descripcion}</div>
                            <div className='d-flex justify-content-end'>
                                <CustomButton icon={Icons.ChevronRight} onClick={onClickEliminar}>Eliminar</CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomModalMensaje>
        </div>
    );
}