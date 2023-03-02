import { Box, Grid, LinearProgress, Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as Icons from 'react-feather';
import Terminal from 'terminal-in-react';
import CustomButton from '../../../components/CustomButton/CustomButton';
import UploadFileCargaUsuario from '../../../components/UploadFileCargaUsuario/UploadFileCargaUsuario';
import { crearTrabajadorApi } from '../../../services/personal/personal';
import './console.scss';

export default function FormularioCrearUsuarioFromFile({ setOpenModal, setOpenModalMensaje, refreshData }) {
  const [currentPageForm, setCurrentPageForm] = useState(0);
  const [isErrorFormParte1, setIsErrorFormParte1] = useState(false);
  const [isErrorFormParte2, setIsErrorFormParte2] = useState(false);
  const [cargaFinalizada, setCargaFinalizada] = useState(false);
  const [cantIngresos, setCantIngresos] = useState(0);

  const [usuariosJson, setUsuariosJson] = useState(null);

  const terminal = useRef()

  useEffect(() => {
    if (currentPageForm === 1) {
      setCargaFinalizada(false)
    } else {
      setCargaFinalizada(true)
    }
  }, [currentPageForm])


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

      setOpenModal(false);
      setOpenModalMensaje({
        titulo: "!Excelente!",
        descripcion: "ha finalizado el proceso de carga masiva de Usuario. Por favor revisa la lista de usuarios para continuar.", isActive: true
      });

      //  setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });

      refreshData()
    },
  });

  function handleContinuarButton() {
    if (currentPageForm === formularios.length - 1) { // ultimo elemento
      formik.handleSubmit();
      refreshData()
    } else {
      if (currentPageForm < formularios.length - 1) { // pagina inicial
        setCurrentPageForm(currentPageForm + 1);
      }
    }
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
    let countUser = 0
    let porcentaje = 0;
    for (const user of usuariosJson) {
      const response = await crearTrabajadorApi(user);
      if (response?.status === 200) {
        porcentaje = (countUser / usuariosJson.length) * 100
        console.log(`Se ha ingresado con exito ${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno} rut ${user.rut}`);
        countUser++;
        setCantIngresos(porcentaje)

      } else {
        console.log(`file not found`);
      }


    }

    console.log(`Proceso finalizado con éxito se ingresaron ${countUser} de ${usuariosJson.length}`);
    setCargaFinalizada(true)
  }


  const formularioParte1 = (
    <div>
      {usuariosJson === null ? <UploadFileCargaUsuario onLoadUser={handleLoadUserFromFile} >

      </UploadFileCargaUsuario> :
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
              variant="outlined" square >
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
  // Capture the console.log calls (hijacking)
  // const originalLog = console.log;
  // console.log = myLog;

  // function myLog() {

  //   originalLog.apply(this, arguments);
  //   originalLog(originalLog);
  // }

  const formularioParte2 = (
    <div>

      <Grid
        sx={{ pt: 5 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          sx={{
            height: 300,
            width: "100%",
            p: 2,
            bgcolor: 'background.default',


          }}
          variant="outlined" square >
          <Grid
            sx={{
              height: 300,
            }}
            container
            direction="column"
            justifyContent="start"
            alignItems="start"
          >
            {/* <Grid item>
              <Icons.File size={40} ></Icons.File>
            </Grid> */}

            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <Terminal watchConsoleLogging
                  color='black'
                  backgroundColor='white'
                  descriptions={{ color: false, show: false, clear: false }}
                  hideTopBar={true}
                  allowTabs={false}
                  showActions={false}
                  style={{ width: "100%", fontWeight: "bold", fontSize: "1em", height: 280, maxHeight: 280 }}
                />
              </Stack>

            </Box>



          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={{ flex: 1, width: '100%' }}>

              <Stack spacing={2} sx={{ flex: 1, width: '100%', pb: 2 }} >
                <LinearProgress determinate value={cantIngresos} />
              </Stack>
            </Grid>

            <Grid item>
              <CustomButton type="button" isEnabled={!cargaFinalizada} icon={Icons.ChevronRight} onClick={() => {
                uploadUser()
              }}>Empezar Carga </CustomButton>
            </Grid>
          </Grid>

        </Paper>

      </Grid>

    </div>
  );

  const formularios = [formularioParte1, formularioParte2];

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
          currentPageForm === 0 ?
            formularioParte1
            :
            <div>

              <Grid
                sx={{ pt: 5 }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Paper
                  sx={{
                    height: 300,
                    width: "100%",
                    p: 2,
                    bgcolor: 'background.default',


                  }}
                  variant="outlined" square >
                  <Grid
                    sx={{
                      height: 300,
                    }}
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="start"
                  >
                    {/* <Grid item>
              <Icons.File size={40} ></Icons.File>
            </Grid> */}

                    <Box sx={{ width: '100%' }}>
                      <Stack spacing={2}>
                        <Terminal watchConsoleLogging={cargaFinalizada}
                          color='black'
                          backgroundColor='white'
                          descriptions={{ color: false, show: false, clear: false }}
                          hideTopBar={true}
                          allowTabs={false}
                          showActions={false}
                          style={{ width: "100%", fontWeight: "bold", fontSize: "1em", height: 280, maxHeight: 280 }}
                        />
                      </Stack>

                    </Box>



                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!cargaFinalizada && <Grid item sx={{ flex: 1, width: '100%' }}>

                      <Stack spacing={2} sx={{ flex: 1, width: '100%', pb: 2 }} >
                        <LinearProgress variant="determinate" value={cantIngresos} />

                      </Stack>
                    </Grid>
                    }
                    <Grid item>
                      <CustomButton isEnabled={!cargaFinalizada} icon={Icons.ChevronRight} onClick={() => {
                        uploadUser()
                      }}>Empezar Carga </CustomButton>
                    </Grid>
                  </Grid>

                </Paper>

              </Grid>

            </div>
        }
      </form>
      <div className={`d-flex mt-5 ${currentPageForm !== 0 ? "justify-content-between" : "justify-content-end"}`}>
        {currentPageForm !== 0 && <CustomButton typeColor="dark" icon={Icons.ArrowLeft} onClick={() => handleAnteriorButton()}>Volver</CustomButton>}
        <CustomButton isEnabled={cargaFinalizada} icon={Icons.ArrowRight} endIcon={true} onClick={() => handleContinuarButton()}>Continuar</CustomButton>
      </div>
    </div>
  );
}





const nacionalidadItems = [{ nombre: "Chile", valor: "chile" }, { nombre: "Peru", valor: "peru" }, { nombre: "Colombia", valor: "colombia" }]
const estadoCivilItems = [{ nombre: "Soltero", valor: "soltero" }, { nombre: "Casado", valor: "casado" }, { nombre: "Viudo", valor: "viudo" }]
const AFPitems = [{ nombre: "AFP Habitat", valor: "afp_habitat" }, { nombre: "AFP Salud", valor: "afp_pro_salud" }, { nombre: "AFP + Vida", valor: "afp_+_vida" }]
const previsionItems = [{ nombre: "Fonasa", valor: "fonasa" }, { nombre: "ISAPRE", valor: "isapre" },]
const ciudadItems = [{ nombre: "Calama", valor: "calama" }, { nombre: "Antofagasta", valor: "antofagasta" }, { nombre: "Santiago", valor: "santiago" }, { nombre: "La Serena", valor: "La Serena" }]
const profesionItems = [{ nombre: "Doctor", valor: "doctor" }, { nombre: "Dentista", valor: "dentista" }, { nombre: "Mecanico", valor: "mecanico" }, { nombre: "Abogado", valor: "abogado" },]
const tipoCuentaArray = [{ nombre: "Cta. Corriente", valor: "cta-corriente" }, { nombre: "Cta. vista", valor: "cta-vista" }, { nombre: "Cta. Ahorro", valor: "cta-ahorro" }]
const steps = [
  {
    titulo: "Subir Archivo",
    descripcion: "Se Procede A cargar los usuarios"
  },
  {
    titulo: "Ingreso ",
    descripcion: "Se añade usuarios"
  }
];