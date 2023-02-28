import { Grid, LinearProgress } from '@mui/material';
import moment from 'moment';
import { useRef, useState } from 'react';
import * as Icons from 'react-feather';
import * as XLSX from 'xlsx';
import './UploadFileCargaUsuario.scss';




export default function UploadFileCargaUsuario({ onLoadUser }) {
  const itemsRef = useRef([]);
  const [fileDocs, setFileDocs] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUploadFile = async (e) => {
    setLoading(true)
    setFileDocs(e.target.files[0])


    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => { // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;

      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
      const usuariosForApi = []
      data.map(usuario => {
        const dataJson = {
          nombres: usuario.Nombre,
          apellidoPaterno: usuario["Apellido1"],
          apellidoMaterno: usuario["Apellido2"],
          rut: usuario["Rut"],
          correo: usuario["Correo"],
          telefono: usuario["Telefono"],
          nacionalidad: usuario["Nacionalidad"],
          estadoCivil: usuario["Estado civil"],
          afp: usuario["AFP"],
          prevision: usuario["Salud"],
          ciudadResidencia: usuario["Ciudad"],
          direccion: usuario["Dirección"],
          profesionEspecialidad: usuario["Cargo"],
          fechaNacimiento: moment(new Date(Math.round((usuario["Fecha de nacimiento"] - 25569) * 86400 * 1000))).toISOString(),
          nombreContactoEmergencia: usuario["Contacto de Emergencia (Nombre y Apellido)"],
          datosBancarios: {
            banco: usuario["Banco"],
            tipoCuenta: usuario["Tipo de Cuenta"],
            numeroDeCuenta: usuario["Numero Cuenta"],
          }
        }



        usuariosForApi.push(dataJson)
      })

      onLoadUser(usuariosForApi)
      setLoading(false)
    };
    reader.readAsBinaryString(file);


  };
  return (
    <>

      {
        loading ? <Grid pt={1} pb={1}><LinearProgress color="primary" /> </Grid> :
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
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              ref={el => itemsRef.current[`upload-file`] = el}
              style={{ height: "0px", display: "none" }}
              onChange={handleUploadFile} />
          </div>
      }
    </>
  );
}