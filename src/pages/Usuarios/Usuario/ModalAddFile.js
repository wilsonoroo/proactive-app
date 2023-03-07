import { Grid, LinearProgress } from "@mui/material";
import { useRef, useState } from "react";
import * as Icons from 'react-feather';
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomDatePicker from "../../../components/CustomInputs/CustomDatePicker";
import { upDateUploadFileApi } from "../../../services/personal/personal";

import PropTypes from 'prop-types';
import CustomModal from "../../../components/CustomModal/CustomModal";

export default function ModalAddFile({ reload, idUser, openModal, item, setOpenModal, refreshData, onFileChange }) {

    const [fechaVencimiento, setfechaVencimiento] = useState(Date.now())
    const [fileUpload, setFileUpload] = useState(null)
    const itemsRef = useRef([]);
    const [fileDocs, setFileDocs] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleUploadFileChange = async (e) => {
        setFileDocs(e.target.files[0])
    }


    const handleUploadFile = async () => {
        setLoading(true)
        const formData = new FormData();
        console.log(item)
        // Update the formData object
        formData.append(
            "file",
            fileDocs,
            fileDocs.name
        );
        formData.append(
            "fechaVencimiento",
            fechaVencimiento
        );
        let result;

        result = await upDateUploadFileApi(idUser, item.tipoDocumento._id, formData)
        setLoading(false)
        setOpenModal(false)
        reload()
        console.log(await result.json())
    };
    return (
        <div>

            <CustomModal
                titulo="Nuevo Usuario"
                openModal={openModal}
                setOpenModal={setOpenModal}
            >
                <CustomDatePicker
                    label="Fecha inicio"
                    name="fechaInicio"
                    className="me-4"
                    value={fechaVencimiento}
                    onChange={(e) => {
                        console.log("onChange", e.target.value)
                        setfechaVencimiento(e.target.value)
                    }} />
                {fileDocs !== null ? fileDocs.name : ""}
                {loading ? <Grid><LinearProgress color="secondary" /></Grid> :
                    <div className='container_upload-file' style={{ cursor: "pointer" }}
                        onClick={(e) => {
                            console.log(itemsRef.current[`upload-file-modal`])
                            itemsRef.current[`upload-file-modal`].click()
                        }}>
                        <label htmlFor="upload-file" style={{ cursor: "pointer" }}>
                            <Icons.UploadCloud color="#0562BE" className='me-2' size={30} />{item?.tipoDocumento?.puedeVencer ? "Añade Documento " : "Arrastra y suelta tu archivo aqui"}
                        </label>
                        <input type="file"
                            name={`upload-file-modal`}
                            id={`upload-file-modal}`}
                            ref={el => itemsRef.current[`upload-file-modal`] = el}
                            style={{ height: "0px", display: "none" }}
                            onChange={handleUploadFileChange} />
                    </div>}
                <div className="d-flex justify-content-end mt-3">
                    <CustomButton icon={Icons.ChevronRight} endIcon={true} typeColor="primary" onClick={() => handleUploadFile()}>Guardar</CustomButton>
                </div>
            </CustomModal>
        </div>
    );
}


ModalAddFile.propTypes = {
    // Puedes decsetOpenModallarar que un
    reload: PropTypes.func,
    idUser: PropTypes.string,
    openModal: PropTypes.bool,
    item: PropTypes.object,
    setOpenModal: PropTypes.func,
    refreshData: PropTypes.func,
    onFileChange: PropTypes.func,
}