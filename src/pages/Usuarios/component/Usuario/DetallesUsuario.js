import { Divider, Typography } from "@mui/material";
import moment from "moment";
import PropTypes from 'prop-types';
export default function DetallesUsuario({ usuario = {} }) {

  const calculateAge = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  }
  return (
    <div>
      <div className="row row-cols-6 mt-2">
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }} >Nombres</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.nombres}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Apellido Paterno</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.apellidoPaterno}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }} >Apellido Materno</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.apellidoMaterno}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }} >E-mail</Typography>
          <div className='fw-bold usuario-text-color-blue text-wrap'><Typography variant="body2" gutterBottom>{usuario.correo}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }} >Nacionalidad</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.nacionalidad}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Profesión/Especialidad</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.profesionEspecialidad}</Typography></div>
        </div>
      </div>
      <div className="row row-cols-6 mt-2">
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Rut</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.rut}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Fecha Nacimiento</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{moment(usuario?.fechaNacimiento).format("DD-MM-YYYY")}</Typography></div>
        </div>
        <div className="col">

          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Edad</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{calculateAge(usuario?.fechaNacimiento)}</Typography></div>
        </div>
        <div className="col">

          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Estado Civil</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.estadoCivil}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Telefono</Typography>
          <div className='fw-bold usuario-text-color-blue'><Typography variant="body2" gutterBottom>{usuario.telefono}</Typography></div>
        </div>


      </div>
      <div className="row row-cols-6 mt-2">
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Ciudad de Residencia</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.ciudadResidencia}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Dirección</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.direccion}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>AFP</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.afp}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Previsión</Typography>
          <div className='fw-bold'><Typography variant="body2" gutterBottom>{usuario.prevision}</Typography></div>
        </div>
        <div className="col">

          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Nombre Contacto de emergencia</Typography>
          <div className='fw-bold usuario-text-color-blue'><Typography variant="body2" gutterBottom>{usuario.nombreContactoEmergencia}</Typography></div>
        </div>
        <div className="col">

          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Telerono Contacto de emergencia</Typography>
          <div className='fw-bold usuario-text-color-blue'><Typography variant="body2" gutterBottom>{usuario.telefonoContactoEmergencia}</Typography></div>
        </div>
      </div>
      <Divider component="div" role="presentation">
        {/* any elements nested inside the role="presentation" preserve their semantics. */}
        <Typography variant="body2">Datos bancarios</Typography>
      </Divider>
      <div className="row row-cols-6 mt-2">
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Banco</Typography>
          <div className='fw-bold usuario-text-color-blue'><Typography variant="body2" gutterBottom>{usuario?.datosBancarios?.banco ?? "---"}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Tipo de Cuenta</Typography>
          <div className='fw-bold usuario-text-color-blue'><Typography variant="body2" gutterBottom>{usuario?.datosBancarios?.tipoCuenta ?? "---"}</Typography></div>
        </div>
        <div className="col">
          <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>Numero Cuenta</Typography>
          <div className='fw-bold usuario-text-color-blue'><Typography variant="body2" gutterBottom>{usuario?.datosBancarios?.numeroDeCuenta ?? "---"}</Typography></div>
        </div>
      </div>
    </div>
  );
}

DetallesUsuario.propTypes = {
  usuario: PropTypes.object,
}