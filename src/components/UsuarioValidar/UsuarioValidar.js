import { Divider, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerRequisitosPorFAena } from '../../api/requisitos/requisitos';
import useFetch from '../../hooks/useFetch';
import UsuarioPagePorProyectoModal from '../../pages/Usuarios/Usuario/UsuarioPagePorProyectoModal';
import { groupByTipoArchivo } from '../../utils/functions';
import CustomModalFull from '../CustomModalFull/CustomModalFull';
import EnviarMensaje from '../EnviarMensaje/EnviarMensaje';
import StatusItem from '../StatusItem/StatusItem';
import UsuarioCardValidar from '../UsuarioCard/UsuarioCardValidar';
import './UsuarioValidar.scss';

export default function UsuarioValidar({ usuario, onDeleteUser, idFaena, solicitud }) {

  const { data: documentos, firstLoading: firstLoadingDocumentos, refreshData: refreshDataDocumentos } = useFetch(() => obtenerRequisitosPorFAena(idFaena));
  const [documentosView, setDocumentosView] = useState(documentosData)

  const [openModal, setOpenModal] = useState({ open: false, data: {} })
  const [openModalMensaje, setOpenModalMensaje] = useState({ open: false, data: {} })



  const navigate = useNavigate();

  const procesar = () => {

    if (documentos !== null && usuario !== null) {
      let groupDocs = groupByTipoArchivo(documentos, "tipoArchivo")
      let setDocsUser = null;
      let documentosUsuario;

      if (usuario.length !== 0) {
        documentosUsuario = usuario.requisito;

        setDocsUser = new Set(documentosUsuario.map(obj => obj._id));

      }
      let arrayDocs = tipoDocuemntos.map(item => {
        let mappingDocs = groupDocs[item.key]?.map(doc => {
          let filterDocs
          let disponible = setDocsUser.has(doc._id)
          if (usuario.length !== 0) {
            filterDocs = documentosUsuario.find(item => item._id === doc._id)
            // console.log(filterDocs.fechaVencimiento, new Date(filterDocs.fechaVencimiento).toString(), disponible)
          }

          return {
            documento: disponible ? filterDocs.documento : null,
            tipoDocumento: doc,
            fechaVencimiento: disponible ? new Date(filterDocs.fechaVencimiento) : null,
            disponible: disponible,
            nombre: doc.nombre,
            puedeVencer: doc.puedeVencer
          }
        })
        return {
          tipoArchivo:
          {
            nombre: item.nombre,
            hash: `#${item.key}`,
            documentos: typeof mappingDocs !== 'undefined' ? mappingDocs : []
          },

        }
      })


      setDocumentosView(arrayDocs)
    }
  }
  useEffect(() => {
    procesar()
  }, [usuario, documentos])

  const handleViewUser = (idUser, idFaena) => {
    //navigate(`/usuarios/${idUser}/${idFaena}`)
    console.log("hanlde view ")
    setOpenModal({ open: true, data: { idUser: idUser, idFaena: idFaena } })
  }

  const handleSendMensaje = (idUser, idFaena) => {
    //navigate(`/usuarios/${idUser}/${idFaena}`)
    console.log("hanlde view ")
    setOpenModalMensaje({ open: true, data: { idUser: idUser, idFaena: idFaena } })
  }

  console.log("hanlde view ", openModal)
  return (
    <>
      <CustomModalFull
        titulo="Nuevo Usuario"
        openModal={openModal}
      >
        <UsuarioPagePorProyectoModal idFaena={openModal.data.idFaena} idParams={openModal.data.idUser} />
        {/* <FormularioCrearUsuario setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} /> */}
      </CustomModalFull>

      <CustomModalFull
        titulo="Nuevo Usuario"
        openModal={openModalMensaje}
      >
        <EnviarMensaje proyecto={""} faena={""} nombre={""} sueldo={""} cargo={""} />
        {/* <FormularioCrearUsuario setOpenModal={setOpenModal} setOpenModalMensaje={setOpenModalMensaje} refreshData={refreshData} /> */}
      </CustomModalFull>


      <div className='container_usuario-validar mt-4'>
        <div className='d-flex'>
          <div className='pe-3'>
            <UsuarioCardValidar usuario={usuario}
              documentos={documentosView}
              onDeleteUser={onDeleteUser}
              idFaena={idFaena}
              onViewUser={handleViewUser}
              solicitud={solicitud}
            // onMensaje={handleSendMensaje} 
            />
          </div>
          <div className='row mt-3'>
            <div className='col-12 '>
              <div className='row'>

                {
                  documentosView.map((item, index) => {
                    return (
                      <div className='col-12 col-md-4' style={{ borderRightStyle: "inset", borderBottomStyle: "inset", paddingBottom: 12, paddingTop: 12 }}>
                        <div className='fw-bold'>{item.tipoArchivo.nombre}</div>
                        <div className="row row-cols-1 d-flex justify-content-between">
                          {

                            item.tipoArchivo.documentos.map((doc, index) => {
                              // console.log(doc)
                              return (<TextoValidar elemento={doc} key={index} />)
                            })

                          }
                        </div>
                        <Grid item s={0.5} sm={0.5} md={0.5} key={`div-${index}`} container spacing={1}>
                          <Divider orientation="vertical" flexItem style={{ borderColor: "black" }} />
                        </Grid>
                      </div>
                    )
                  })

                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export function TextoValidar({ elemento }) {

  return (
    <>
      <div className="container-documento-validar_usuario-validar">
        <div className='container-texto-documento-validar_usuario-validar'>
          {elemento.nombre}
        </div>
        <div>
          <StatusItem typeColor={elemento.disponible ? "verde" : "rojo"} />
        </div>
      </div>
    </>
  );
}

const tipoDocuemntos = [
  { key: 'documentos', nombre: "Documentos" },
  { key: 'licencia', nombre: "Licencias" },
  { key: 'examenes', nombre: "Exámenes" },
  { key: 'epp', nombre: "Epp" },
  { key: 'curso_capacitacion', nombre: "Curso y Capacitaciones" },
  { key: 'otros', nombre: "Otros" },
]

const documentosData = [

  {
    tipoArchivo: {
      nombre: "Documentos",
      hash: "#documentos",
      documentos: []
    }

  },
  {
    tipoArchivo: {
      nombre: "Licencias", hash: "#licencias", documentos: []
    }



  },
  {
    tipoArchivo: {
      nombre: "Exámentes", hash: "#examentes", documentos: [
      ]
    }

  },
  {
    tipoArchivo: {
      nombre: "Epp", hash: "#epp", documentos: [

      ]
    }

  },
  {
    tipoArchivo: {
      nombre: "Cursos y capacitaciones", hash: "#cursos-y-capacitaciones", documentos: [

      ]
    }

  },
  {
    tipoArchivo: {
      nombre: "Otros", hash: "#otros", documentos: [

      ]
    }

  },
]