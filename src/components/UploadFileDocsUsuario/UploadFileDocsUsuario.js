import ErrorIcon from '@mui/icons-material/Error';
import { Chip, Grid, LinearProgress } from '@mui/material';
import JSZip from "jszip";
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import * as Icons from 'react-feather';
import useFetch from '../../hooks/useFetch';
import { upDateUploadFileApiWithRut } from '../../services/personal/personal';
import { obtenerRequisitosApi } from '../../services/requisitos/requisitos';
import './UploadFileCargaUsuario.scss';




export default function UploadFileDocsUsuario({ onLoadUser }) {
  const itemsRef = useRef([]);
  const [fileDocs, setFileDocs] = useState(null)
  const [loading, setLoading] = useState({ loading: false, cargaMasivaFinalizada: true, error: [] })
  const [statusFiles, setStatusFiles] = useState([])
  const [loaderCount, setLoaderCount] = useState({ porcentaje: 0 })
  const [cargaMasivaFinalizada, setCargaMasivaFinalizada] = useState(true)
  const [erroresCarga, setErroresCarga] = useState([])
  const [erroresCargaRender, setErroresCargaRender] = useState([])


  const { data: requisitos, firstLoading, refreshData } = useFetch(() => obtenerRequisitosApi());

  const handleUploadFile = async (e) => {

    setLoading({ loading: true, cargaMasivaFinalizada: false, error: [] })
    setFileDocs(e.target.files[0])


    let file = e.target.files[0];
    var jsZip = new JSZip();


    jsZip.loadAsync(file).then(async function (zip) {

      let resultFiles = []
      let resultFilesArg = []
      for await (const filename of Object.keys(zip.files)) {
        let split = filename.split("/");
        let nameFile = split[split.length - 1];
        let splitName = nameFile.split("_");

        let requisito = requisitos.find((value) => value.codigo === splitName[0])


        if (typeof requisito !== "undefined") {
          console.log(splitName[1]?.split(`.`)[0], requisito._id)
          let fechaVencimiento = Date.now()
          if (splitName[2]) {
            let date = splitName[2].split('.')[0]
            console.log(splitName[1]?.split(`.`)[0], date)
            fechaVencimiento = moment(date.replace('-', '/'), 'DD/MM/YYYY').toDate()
            let fechaVencimientoToDate = moment(date.replaceAll('-', '/'))
            console.log(splitName[1]?.split(`.`)[0], fechaVencimiento, fechaVencimientoToDate)
          }

          resultFiles.push(zip.files[filename].async('Blob'));
          resultFilesArg.push({ rut: splitName[1]?.split(`.`)[0], requisito: requisito?._id, filename: nameFile, fechaVencimiento: fechaVencimiento })
        }


      }

      Promise.all(resultFiles).then(async (result) => {
        let resultApi = []
        await result.map((item, index) => {
          console.log(item)
          item.filename = resultFilesArg[index].filename

          resultApi.push(loadFile(item, resultFilesArg[index].filename, resultFilesArg[index].rut, resultFilesArg[index].requisito, resultFilesArg[index].fechaVencimiento))
        })
        console.log(resultApi)
        let contador = 10;
        let i = 0;
        let resultFinish = []
        while (i < resultApi.length) {
          console.log(`=======================init========================`)
          console.log(`slice for ${i} to ${contador}`)
          setLoaderCount({ mensaje: `Subiendo ${i} de ${resultApi.length} archivos`, porcentaje: (i / resultApi.length) * 100 })
          let reusltPartition = resultApi.slice(i, contador);
          if (true) {
            let resultado = await Promise.all(reusltPartition);
            resultFinish = [...resultFinish, ...resultado];
          }

          i = contador;
          contador = contador + 10 + 1
          console.log(`=========================fin======================`)
        }
        console.log(resultFinish)
        setLoading({ loading: false, cargaMasivaFinalizada: false, error: resultFinish })

      })
    })
  };


  const loadFile = (file, filename, rut, idReq, date = Date.now()) => {
    console.log(date)
    const formData = new FormData();
    formData.append(
      "file",
      file,
      filename,

    );

    formData.append(
      "fechaVencimiento",
      date
    );
    return upDateUploadFileApiWithRut(rut, idReq, formData)

  }

  const errorRender = [];
  useEffect(() => {

    erroresCarga.forEach((error, index) => {
      errorRender.push(
        <div key={index}>
          <p>{error.mensaje}</p>
        </div>,
      );
    });


  }, [errorRender, erroresCarga])


  return (
    <>

      {
        loading.loading ? <Grid pt={1} pb={1}>
          <LinearProgress variant="determinate" value={loaderCount.porcentaje} />
          {/* <LinearProgress color="primary" /> */}
          <p>{loaderCount.mensaje}</p>
          {statusFiles.forEach(element => {
            <p>{element.requisito.documento.filename}</p>
          })
          }
        </Grid> :
          loading.cargaMasivaFinalizada ?
            <div className='container_upload-file' style={{ cursor: "pointer" }}
              onClick={(e) => {
                console.log(itemsRef.current[`upload-file}`])
              }}>
              <label htmlFor="upload-file" style={{ cursor: "pointer" }}>
                <Icons.UploadCloud color="#0562BE" className='me-2' size={30} />{"Arrastra y suelta tu archivo aqui"}
              </label>
              <input type="file"
                name={`upload-file`}
                id={`upload-file`}
                ref={el => itemsRef.current[`upload-file`] = el}
                style={{ height: "0px", display: "none" }}
                onChange={handleUploadFile} />
            </div>
            :
            <>

              <p>Carga masiva Finalizada</p><p>Errores encontrado</p>
              {errorRender}
              <Grid container rowSpacing={2} columnSpacing={2}>
                {loading.error.map((item, index) => {
                  if (item?.error)
                    return (<div key={index}>
                      <Grid item key={index}>
                        <Chip icon={<ErrorIcon style={{ color: '#BB342F' }} />} label={`${item?.mensaje}`} />
                      </Grid>

                    </div>)
                  else {
                    return <></>
                  }
                })


                }
              </Grid>


            </>


      }


    </>
  );
}