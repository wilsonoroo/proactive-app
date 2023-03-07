import { Box, Grid, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as Icons from 'react-feather';
import CustomButton from '../../../components/CustomButton/CustomButton';
import UploadFileDocsUsuario from '../../../components/UploadFileDocsUsuario/UploadFileDocsUsuario';
import { crearTrabajadorApi } from '../../../services/personal/personal';


export default function FormularioAddDocsUsuarioFromFile({ setOpenModal, setOpenModalMensaje, refreshData }) {
  const [currentPageForm, setCurrentPageForm] = useState(0);
  const [isErrorFormParte1, setIsErrorFormParte1] = useState(false);
  const [isErrorFormParte2, setIsErrorFormParte2] = useState(false);

  const [usuariosJson, setUsuariosJson] = useState(null);



  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: "",
      nacionalidad: "",
      profesionEspecialidad: "",
      rut: "",
      fechaNacimiento: "",
      telefono: "",
      ciudadResidencia: "",
      direccion: "",
      cargosCompatibles: [],
      afp: "",
      prevision: "",
      nombreContactoEmergencia: "",
      telefonoContactoEmergencia: "",
      banco: "",
      tipoCuenta: "",
      numeroDeCuenta: "",
      requisito: [],
      licencia: [],
      estadoCivil: "",
    },

    onSubmit: async (values) => {
      console.log(values)
      const response = await crearTrabajadorApi(values);
      setOpenModal(false);
      if (response?.status === 201) {
        refreshData()
      } else {
        setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "Ha fallado el proceso de carga revisa los documentos", isActive: true });
      }
    },
  });

  function handleContinuarButton() {
    setOpenModal(false);
    setOpenModalMensaje({ titulo: "!Excelente!", descripcion: "Se han cargado a la plataforma los documentos. Por favor revisa la lista de usuarios para continuar.", isActive: true });
    refreshData()
  }

  function handleAnteriorButton() {
    if (currentPageForm > 0) { // pagina inicial
      setCurrentPageForm(currentPageForm - 1);
    }
  }

  const handleLoadUserFromFile = (usuarios) => {
    setUsuariosJson(usuarios)

  }
  const uploadUser = async () => {
    usuariosJson.map(async user => {
      const response = await crearTrabajadorApi(user);
      console.log(response);
    })

  }

  console.log(usuariosJson);
  const formularioParte1 = (
    <div>
      {usuariosJson === null ? <UploadFileDocsUsuario onLoadUser={handleLoadUserFromFile} >

      </UploadFileDocsUsuario> :
        <>
          <Grid
            sx={{ pt: 5 }}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Paper
              sx={{
                height: 150, p: 2,
                bgcolor: 'background.default',


              }}
              elevation={25} variant="outlined" square >
              <Grid
                sx={{ pt: 5 }}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Icons.File size={40} ></Icons.File>
                </Grid>
                <Grid item>
                  <Typography variant="overline" display="block" gutterBottom>
                    Archivo Cargado con exito
                  </Typography>
                </Grid>

              </Grid>


            </Paper>

          </Grid>
        </>}

    </div >
  );



  const formularios = [formularioParte1];

  return (
    <div>
      <div className='row'>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={currentPageForm} alternativeLabel>
            {steps.map((elemento, index) => {
              return <Step key={elemento.titulo}>
                <StepLabel error={index === 0 ? isErrorFormParte1 : isErrorFormParte2}>
                  <div className='d-flex justify-content-center fw-bold'>
                    {elemento.titulo}
                  </div>
                  <div className='d-flex justify-content-center'>
                    {elemento.descripcion}
                  </div>
                </StepLabel>
              </Step>
            })}
          </Stepper>
        </Box>
      </div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        {
          formularioParte1
        }
      </form>
      <div className={`d-flex mt-5 ${currentPageForm !== 0 ? "justify-content-between" : "justify-content-end"}`}>
        {currentPageForm !== 0 && <CustomButton typeColor="dark" icon={Icons.ArrowLeft} onClick={() => handleAnteriorButton()}>Volver</CustomButton>}
        <CustomButton icon={Icons.ArrowRight} endIcon={true} onClick={() => handleContinuarButton()}>Continuar</CustomButton>
      </div>
    </div>
  );
}

FormularioAddDocsUsuarioFromFile.propTypes = {
  // Puedes decsetOpenModallarar que un
  setOpenModal: PropTypes.bool,
  setOpenModalMensaje: PropTypes.bool,
  refreshData: PropTypes.func,
}
const steps = [
  {
    titulo: "Subir Archivo",
    descripcion: "Se Procede A cargar de documentos"
  },

];