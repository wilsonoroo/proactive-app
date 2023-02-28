import { useEffect, useState } from "react";
import * as Icons from 'react-feather';
import { donwloadFileCompilado } from "../../../../api/requisitos/requisitos";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import CustomTabs from "../../../../components/CustomTabs.js/CustomTabs";
import Documento from "../../../../components/Documento/Documento";
import MaterialContainer from "../../../../components/MaterialContainer/MaterialContainer";


export default function DocumentosUsuario({ reload, usuario, idUser, documentos, onUploadFile, onClick, onDownloadFile }) {
  const [itemSelected, setItemSelected] = useState(typeof documentos[0]?.tipoArchivo === "undefined" ? "" : documentos[0]?.tipoArchivo?.hash);
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs(documentos.map(item => item.tipoArchivo))
  }, [])

  const handleDownloadFiles = async () => {

    let documentosMerge = []
    for (let tab of documentos) {
      if (tab.tipoArchivo?.documentos.length !== 0) {
        for (let doc of tab.tipoArchivo.documentos) {
          if (doc?.documento) {
            documentosMerge.push(doc.documento)
          }
        }
      }
    }

    let response = await donwloadFileCompilado(documentosMerge)
    onDownloadFile(response)

  }

  return (
    <>
      {typeof documentos[0]?.tipoArchivo !== "undefined" ? <div className='d-flex align-items-center my-3'>
        <CustomTabs items={tabs} setItemSelected={setItemSelected} itemSelected={itemSelected} />
      </div> : <></>}

      {
        typeof documentos[0]?.tipoArchivo !== "undefined" ?
          documentos.map((item) => {
            if (item.tipoArchivo.hash === itemSelected) {

              return (
                <MaterialContainer key={item.tipoArchivo.hash} textoIzquierda={item.tipoArchivo.nombre}>
                  <div className='row'>
                    {
                      item.tipoArchivo.documentos.map((elemento, index) => {

                        return (
                          <Documento reload={reload} idUser={idUser} index={index} key={index} item={elemento} onUploadFile={onUploadFile} onClick={onClick} />
                        );
                      })
                    }
                  </div>
                </MaterialContainer>
              );
            }
            return null;
          }) : <></>
      }
      <div className="d-flex justify-content-end mt-3">
        <CustomButton icon={Icons.ChevronRight} endIcon={true} typeColor="primary" onClick={handleDownloadFiles}>Descargar Compilado</CustomButton>
      </div>
    </>
  );
}