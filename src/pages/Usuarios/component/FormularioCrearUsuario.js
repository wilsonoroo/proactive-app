import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Icons from 'react-feather';
import * as yup from 'yup';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomDatePicker from '../../../components/CustomInputs/CustomDatePicker';
import CustomSelect from '../../../components/CustomInputs/CustomSelect';
import CustomTextField from '../../../components/CustomInputs/CustomTextField';
import { crearTrabajadorApi } from '../../../services/personal/personal';



export default function FormularioCrearUsuario({ setOpenModal, setOpenModalMensaje, refreshData }) {
  const [currentPageForm, setCurrentPageForm] = useState(0);
  const [isErrorFormParte1, setIsErrorFormParte1] = useState(false);
  const [isErrorFormParte2, setIsErrorFormParte2] = useState(false);

  const validationSchema = yup.object({
    nombres: yup
      .string('a')
      .required('Este campo es requerido'),
    apellidoPaterno: yup
      .string('a')
      .required('Este campo es requerido'),
    apellidoMaterno: yup
      .string('a')
      .required('Este campo es requerido'),
    rut: yup
      .string('a')
      .required('Este campo es requerido'),
    correo: yup
      .string('a')
      .required('Este campo es requerido'),
    telefono: yup
      .string('a')
      .required('Este campo es requerido'),
    nacionalidad: yup
      .string('')
      .required('Este campo es requerido'),
    estadoCivil: yup
      .string('')
      .required('Este campo es requerido'),
    afp: yup
      .string('')
      .required('Este campo es requerido'),
    prevision: yup
      .string('')
      .required('Este campo es requerido'),
    ciudadResidencia: yup
      .string('')
      .required('Este campo es requerido'),
    direccion: yup
      .string('')
      .required('Este campo es requerido'),
    profesionEspecialidad: yup
      .string('')
      .required('Este campo es requerido'),
  });

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
      requisito: [],
      licencia: [],
      estadoCivil: "",
      isActivo: true,
      datosBancarios: {
        banco: "",
        tipoCuenta: "",
        numeroDeCuenta: "",
      }
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      const response = await crearTrabajadorApi(values);
      setOpenModal(false);
      if (response?.status === 201 || response?.status === 200) {
        setOpenModalMensaje({ titulo: "!Excelente!", descripcion: "Se ha creado un nuevo Perfil de Usuario. Por favor revisa la lista de usuarios para continuar.", isActive: true });
        refreshData()
      } else {
        setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
      }
    },
  });

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
      {/* Nombre y Apellido paterno */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="nombres" label="Nombre" formik={formik} />
        </div>
        <div className='col-6'>
          <CustomTextField name="apellidoPaterno" label="Apellido Paterno" formik={formik} />
        </div>
      </div>

      {/* Apellido materno y RUT */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="apellidoMaterno" label="Apellido Materno" formik={formik} />
        </div>
        <div className='col-6'>
          <CustomTextField name="rut" label="RUT" formik={formik} />
        </div>
      </div>

      {/* Email y Numero telefono */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="correo" label="E-mail" formik={formik} />
        </div>
        <div className='col-6'>
          <CustomTextField name="telefono" label="N° de Teléfono" formik={formik} />
        </div>
      </div>
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomDatePicker
            label="Fecha Nacimiento"
            name="fechaNacimiento"
            className="me-4"
            // value={fechaVencimiento}
            onChange={(e) => {

              formik.setFieldValue("fechaNacimiento", Date.parse(e.target.value));
              console.log("onChange", e.target.value)

            }} />
        </div>
        <div className='col-6'>

        </div>
      </div>



      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="nombreContactoEmergencia" label="Nombre Contacto emergencia" formik={formik} />
        </div>
        <div className='col-6'>
          <CustomTextField name="telefonoContactoEmergencia" label="N° de Teléfono Contacto emergencia" formik={formik} />
        </div>
      </div>
    </div>
  );

  const formularioParte2 = (
    <div>
      {/* Nacionalidad y Estado civil */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="nacionalidad" label="Nacionalidad" listaItems={nacionalidadItems} formik={formik} />
        </div>
        <div className='col-6'>
          <CustomTextField name="estadoCivil" label="Estado Civil" listaItems={estadoCivilItems} formik={formik} />
        </div>
      </div>

      {/* AFP y Prevision */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="afp" label="AFP" listaItems={AFPitems} formik={formik} />
        </div>
        <div className='col-6'>
          <CustomTextField name="prevision" label="Prevision" listaItems={previsionItems} formik={formik} />
        </div>
      </div>

      {/* Ciudad de Residencia y Direccion de Residencia */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="ciudadResidencia" label="Ciudad de Residencia" listaItems={ciudadItems} formik={formik} />
        </div>
        <div className='col-6'>
          <CustomTextField name="direccion" label="Dirección de Residencia" formik={formik} />
        </div>
      </div>

      {/* Profesión / Especialidad */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <CustomTextField name="profesionEspecialidad" label="Profesión / Especialidad" listaItems={profesionItems} formik={formik} />
        </div>
      </div>

      {/* Ciudad de Residencia y Direccion de Residencia */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="datosBancarios.banco" label="Banco" listaItems={ciudadItems} formik={formik} />
        </div>
        <div className='col-6'>
          <CustomSelect name="datosBancarios.tipoCuenta" label="TipoCuenta" listaItems={tipoCuentaArray} formik={formik} />
        </div>
      </div>

      {/* Ciudad de Residencia y Direccion de Residencia */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomTextField name="datosBancarios.numeroDeCuenta" label="N° Cuenta" listaItems={ciudadItems} formik={formik} />
        </div>
      </div>
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
const tipoCuentaArray = [{ nombre: "Cta. Corriente", valor: "cta-corriente" }, { nombre: "Cta. vista", valor: "cta-vista" }, { nombre: "Cta. Ahorro", valor: "cta-ahorro" }]
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