import { Box, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import * as yup from 'yup';
import { obtenerCargosPorFaenas } from '../../api/cargos/cargos';
import { obtenerFaenasApi } from '../../api/faena/faenasApi';
import { obtenerResponsables } from '../../api/personal/personal';
import { actualizarSoicitudReclutamiento, crearSoicitudReclutamiento, createSolicitudDePersonal } from '../../api/solicitudes/solicitud';
import useFetch from '../../hooks/useFetch';
import CustomButton from '../CustomButton/CustomButton';
import { CustomDatePickerFormik } from '../CustomInputs/CustomDatePicker';
import CustomSelect from '../CustomInputs/CustomSelect';
import CustomTextField from '../CustomInputs/CustomTextField';

export default function FormularioCrearReclutamiento({ setOpenModal, setOpenModalMensaje, refreshData }) {
  const [currentPageForm, setCurrentPageForm] = useState(0);
  const [isErrorFormParte1, setIsErrorFormParte1] = useState(false);
  const [isErrorFormParte2, setIsErrorFormParte2] = useState(false);

  const [listaResponsables, setListaResponsables] = useState([])
  const [listaFaenas, setListaFaenas] = useState([])
  const [faenaSelect, setFaenaSelect] = useState(null);
  const { data: faenasApi, firstLoading, refreshData: refreshDataFaenas } = useFetch(() => obtenerFaenasApi());
  const { data: responseApi, firstLoading: firstLoadingResponsable, refreshData: refreshDataResponsable } = useFetch(() => obtenerResponsables());
  const { data: cargosApi, firstLoading: firstLoadingCargos, refreshData: refreshDataCargos } = useFetch(() => obtenerCargosPorFaenas(faenaSelect));

  const validationSchema = yup.object({
    nombreProyecto: yup.string('').required('Este campo es requerido'),

  });

  useEffect(() => {

    if (responseApi !== null) {
      setListaResponsables(responseApi.map((value) => {
        return { ...value, valor: value._id, nombre: value.name }
      }))
    }
  }, [responseApi])


  useEffect(() => {

    if (faenasApi !== null) {
      setListaFaenas(faenasApi.map((value) => {
        return { ...value, valor: value._id }
      }))
      refreshDataCargos()
    }
  }, [faenasApi])

  const formik = useFormik({
    initialValues: {
      nombreProyecto: "",
      faenaAsignar: "",
      responsable: "",
      fechaInicioProyecto: "",
      faena: "",
      cargos: []

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values))
      console.log(values)
      const response = await crearSoicitudReclutamiento(values);

      let solicitudCreada = await response.json();

      for (let i = 0; i < values.cargos.length; i++) {
        let cargoSol = values.cargos[i];
        let responsePersonal = await createSolicitudDePersonal({
          cargo: Object.keys(cargoSol)[0],
          cantidad: cargoSol[Object.keys(cargoSol)[0]],
          solicitudReclutamiento: solicitudCreada._id
        })
        let solicitudPesonal = await responsePersonal.json()
        solicitudCreada.personalSolicitadoCargo.push(solicitudPesonal._id)
      }


      const actualizcionResponse = await actualizarSoicitudReclutamiento(solicitudCreada);
      console.log(await actualizcionResponse.json())
      setOpenModal(false)
      setOpenModalMensaje(true)
      refreshData();
      //actualizarSoicitudReclutamiento



      // cargo: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Cargos',
      //   required: true
      // },
      // cantidad: {
      //   type: Number,
      //   default: 0
      // },
      // solicitudReclutamiento: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Solicitudreclutamiento',
      //   required: true
      // },


    },


  });
  useEffect(() => {
    if (faenaSelect !== null) {
      refreshDataCargos()
    }

  }, [faenaSelect])



  const { handleChange, submitForm, setFieldValue, touched, errors, values } = formik;

  const onChange = (e) => {
    setFaenaSelect(e.target.value)
  }

  function handleContinuarButton() {
    if (currentPageForm === formularios.length - 1) { // ultimo elemento
      formik.handleSubmit();
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

  const formularioParte1 = (
    <div>
      {/* Nombre del proyecto */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <CustomTextField name="nombreProyecto" label="Nombre del Proyecto" formik={formik} />
        </div>
      </div>

      {/* Faena a asignar */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <CustomSelect name="faena" onChange={onChange} label="Faena a Asignar" listaItems={listaFaenas} formik={formik} />
        </div>
      </div>

      {/* Responsable de Acreditacion */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <CustomSelect name="responsable" label="Responsable de Acreditación" listaItems={listaResponsables} formik={formik} />
        </div>
      </div>

      {/* Fecha inicio del proyecto */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomDatePickerFormik name="fechaInicioProyecto" label="Fecha inicio de Proyecto" formik={formik} />
        </div>
      </div>
    </div>
  );

  const formularioParte2 = (
    <div>
      {/* Nacionalidad y Estado civil */}
      {
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} pt={1}>
          {cargosApi ? cargosApi.map((item, index) => {

            return (
              <Grid item xs={6} >
                <CustomTextField type="number" name={`cargos[${index}].${item._id}`} label={`${item.nombre}`} formik={formik} />
              </Grid>
            )

          }) : <></>}
        </Grid>

      }
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
            formularioParte2
        }
      </form>
      <div className={`d-flex mt-5 ${currentPageForm !== 0 ? "justify-content-between" : "justify-content-end"}`}>
        {currentPageForm !== 0 && <CustomButton typeColor="dark" icon={Icons.ArrowLeft} onClick={() => handleAnteriorButton()}>Volver</CustomButton>}
        <CustomButton icon={Icons.ArrowRight} endIcon={true} onClick={() => handleContinuarButton()}>Continuar</CustomButton>
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

const steps = [
  {
    titulo: "Creación de Perfil",
    descripcion: "Datos Básicos"
  },
  {
    titulo: "Validación de Perfil",
    descripcion: "Datos Especiales"
  }
];