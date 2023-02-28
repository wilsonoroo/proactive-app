import { Link } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import * as Icons from 'react-feather';
import { deleteUploadFileApi } from "../../api/personal/personal";
import * as util from '../../utils/utils';
import MaterialContainerDocumento from "../MaterialContainerDocumento/MaterialContainerDocumento";
import UploadFile from "../UploadFile/UploadFile";
import './Documento.scss';
import EliminarDocumentoDialog from "./EliminarDocumentoDialog";

export default function Documento({ reload, idUser, item, onUploadFile, onClick, index }) {

  const [openModal, setOpenModal] = useState({
    titulo: "Eliminar Documento",
    descripcion: "Se procedera a eliminar el documento.",
    isActive: false,
  });
  const handlerEliminar = async () => {
    var result = await deleteUploadFileApi(idUser, item.tipoDocumento._id)
    setOpenModal({ ...openModal, isActive: false })

    reload()
  }

  return (

    <div className='col-12 col-md-6 my-2'>
      <EliminarDocumentoDialog openModal={openModal} setOpenModal={setOpenModal} onClickEliminar={handlerEliminar} />
      <MaterialContainerDocumento isVencido={item.fechaVencimiento < new Date()} textoIzquierda={item.nombre} textoDerecha={item.tipoDocumento.puedeVencer ? util.dateToString(item.fechaVencimiento) : null} >
        <div className='d-flex justify-content-between'>
          <div className='container-archivo_documento'>
            {
              item.documento != null && <>
                <Icons.File className='icono-archivo_documento' />
                <span className="color-dark">
                  <Link href={item.documento?.linkUrl} color={"#000"}>{decodeURI(item.documento?.filename)}</Link>
                </span>
              </>
            }
          </div>
          <div className={`container-archivo_documento ${item.archivo === null && 'desactivar-archivo_archivo_documento'}`}>
            <div className="icono-check_documento"><Icons.CheckSquare style={{ color: item.disponible ? "#4ACBA8" : "#B4B6B8" }} /></div>
            <div className="icono-eliminar_documento" onClick={() => { setOpenModal({ ...openModal, isActive: true }) }}><Icons.Trash style={{ color: item.disponible ? "#FB050C" : "#B4B6B8" }} /></div>
          </div>
        </div>
        <Box>
          <div className={`${item.archivo === null && 'desactivar-archivo_archivo_documento'}`}>
            <UploadFile reload={reload} idUser={idUser} item={item} index={index} puedeVencer={item.tipoDocumento?.puedeVencer} onFileChange={onUploadFile} onClick={onClick} />
          </div>
        </Box>

      </MaterialContainerDocumento>
    </div>

  );
}