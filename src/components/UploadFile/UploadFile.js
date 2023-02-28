import { Grid, LinearProgress, Link } from '@mui/material';
import { useRef, useState } from 'react';
import * as Icons from 'react-feather';
import { upDateUploadFileApi } from '../../api/personal/personal';
import ModalAddFile from '../../pages/Usuarios/Usuario/ModalAddFile';
import './UploadFile.scss';




export default function UploadFile({ reload, idUser, item, index }) {
  const itemsRef = useRef([]);
  const [fileDocs, setFileDocs] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleUploadFile = async (e) => {
    setLoading(true)
    setFileDocs(e.target.files[0])
    const formData = new FormData();
    console.log(itemsRef.current[`upload-file-${index}`].files)
    // Update the formData object
    formData.append(
      "file",
      e.target.files[0],
      e.target.files[0].name
    );
    const result = await upDateUploadFileApi(idUser, item?.tipoDocumento._id, formData)
    setLoading(false)
    reload()
  };
  return (
    <>
      <ModalAddFile reload={reload} idUser={idUser} item={item} openModal={openModal} setOpenModal={setOpenModal} onFileChange={handleUploadFile} />
      {fileDocs !== null ? <Link href={item.documentos?.selfLink} underline="hover">
        {fileDocs.name}
      </Link> : ""
      }
      {
        loading ? <Grid pt={1} pb={1}><LinearProgress color="primary" /> </Grid> :
          <div className='container_upload-file' style={{ cursor: "pointer" }}
            onClick={(e) => {
              console.log(itemsRef.current[`upload-file-${index}`])
              // itemsRef.current[index].select()
              if (!item?.tipoDocumento.puedeVencer) {
                itemsRef.current[`upload-file-${index}`].click()
              } else {
                setOpenModal(true)
              }
            }}>
            <label htmlFor="upload-file" style={{ cursor: "pointer" }}>
              <Icons.UploadCloud color="#0562BE" className='me-2' size={30} />{item?.tipoDocumento?.puedeVencer ? "Añade Documento " : "Arrastra y suelta tu archivo aqui"}
            </label>
            <input type="file"
              name={`upload-file-${index}`}
              id={`upload-file-${index}`}
              ref={el => itemsRef.current[`upload-file-${index}`] = el}
              style={{ height: "0px", display: "none" }}
              onChange={handleUploadFile} />
          </div>
      }
    </>
  );
}