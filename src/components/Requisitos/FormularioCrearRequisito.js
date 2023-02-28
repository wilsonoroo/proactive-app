import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import * as yup from 'yup';
import { obtenerCargosPorFaenas } from '../../api/cargos/cargos';
import { obtenerFaenasApi } from '../../api/faena/faenasApi';
import { actualizarRequisito, crearCargoRequisito } from '../../api/requisitos/requisitos';
import useFetch from '../../hooks/useFetch';
import { nacionalidadItems, tipoArchivosItems } from '../../utils/enums';
import CustomButton from '../CustomButton/CustomButton';
import CustomSelect from '../CustomInputs/CustomSelect';
import CustomTextField from '../CustomInputs/CustomTextField';
import Seleccionador from '../Seleccionador/Seleccionador';

export default function FormularioCrearUsuario({ setOpenModal, setOpenModalMensaje, refreshData, data = null, edit = false }) {
  const [currentPageForm, setCurrentPageForm] = useState(0);
  const [currentData, setCurrentData] = useState(data);
  const [isErrorFormParte1, setIsErrorFormParte1] = useState(false);
  const [isErrorFormParte2, setIsErrorFormParte2] = useState(false);

  const [faenaSelect, setFaenaSelect] = useState(null);
  const { data: faenasApi, firstLoading, refreshData: refreshDataFaenas } = useFetch(() => obtenerFaenasApi());
  const { data: cargosApi, firstLoading: firstLoadingCargos, refreshData: refreshDataCargos } = useFetch(() => obtenerCargosPorFaenas(faenaSelect));

  const [faenas, setFaenas] = useState([]);
  const [cargos, setCargos] = useState([]);


  //const { handleChange, submitForm, setFieldValue, touched, errors, values } = formik;

  const validationSchema = yup.object({
    nombre: yup
      .string('a')
      .required('Este campo es requerido'),
  });

  const formik = useFormik({
    initialValues: currentData ? { ...currentData, faenas: [], cargos: [] } : {
      nombre: "",
      tipoArchivo: "",
      puedeVencer: "",
      faenas: [],
      cargos: [],
      obligatorioAcreditacion: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      let response;
      let titulo;
      let descripcion;

      if (currentData === null) {
        console.log("data!==null")
        titulo = "!Excelente!"
        descripcion = "Se ha creado un nuevo Requisito. Por favor revisa la lista de requisitos para continuar."
        response = await crearCargoRequisito(values);
      } else {
        titulo = "!Excelente!"
        descripcion = "Se ha actualizado el Requisito. Por favor revisa la lista de requisitos para continuar."
        response = await actualizarRequisito(values);
      }
      console.log(response)


      if (response.status === 201) {
        setOpenModal(false)
        setOpenModalMensaje({ titulo: titulo, descripcion: descripcion, isActive: true });
        formik.resetForm();
        refreshData()
      } else if (response.status === 200) {
        setOpenModal(false)
        setOpenModalMensaje({ titulo: titulo, descripcion: descripcion, isActive: true });
        formik.resetForm();
        refreshData()
      } else {
        setOpenModal(false)
        formik.resetForm();
        setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
      }
      const data = await response;
    },
  });

  const { setFieldValue } = formik;
  const [examenFaena, setExamenFaena] = useState(
    [
      { nombre: "CMZ", estado: true },
      { nombre: "CMLB", estado: false },
      { nombre: "CMSG", estado: false },
      { nombre: "BHP-MEL", estado: true },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "CMSG", estado: false },
      { nombre: "BHP-MEL", estado: true },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "CMSG", estado: false },
      { nombre: "BHP-MEL", estado: true },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "CMSG", estado: false },
      { nombre: "BHP-MEL", estado: true },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "CMSG", estado: false },
      { nombre: "BHP-MEL", estado: true },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
      { nombre: "CMSG", estado: false },
      { nombre: "BHP-MEL", estado: true },
      { nombre: "BHP-SPENCE", estado: false },
      { nombre: "CMDIC", estado: false },
    ]
  );


  useEffect(() => {
    if (!firstLoading) {
      setFaenas(
        faenasApi.map((item) => {
          return { ...item, estado: false }
        })
      )
    }
  }, [faenasApi, firstLoading])

  useEffect(() => {
    if (!firstLoadingCargos) {
      setCargos(
        cargosApi.map((item) => {
          return { ...item, estado: false }
        })
      )
    }
  }, [cargosApi, firstLoadingCargos])

  useEffect(() => {
    if (faenaSelect !== null) {
      refreshDataCargos()
    }

  }, [faenaSelect])

  function handleContinuarButton() {
    console.log(currentPageForm)
    console.log(currentPageForm === formularios.length - 1)


    if (currentPageForm === formularios.length - 1) { // ultimo elemento
      formik.handleSubmit();
    } else {
      if (currentPageForm < formularios.length - 1) { // pagina inicial
        setCurrentPageForm(currentPageForm + 1);
      }
    }
  }

  const handlerSelectFaena = (faena) => {
    let arrayFaenas = formik.values["faenas"]
    let arrayCargos = formik.values["cargos"]
    setFaenaSelect(faena._id);
    console.log(formik.values);
    if (!faena.estado) {
      arrayFaenas.push(faena._id)
    } else {
      console.log("se borra")
      arrayFaenas = arrayFaenas.filter(item => item !== faena._id)
      const namesToDeleteSet = new Set(cargos.map((item) => item._id));
      arrayCargos = arrayCargos.filter((name) => {
        // return those elements not in the namesToDeleteSet
        console.log(name);
        return !namesToDeleteSet.has(name);
      });

      setFieldValue('cargos', arrayCargos);
      console.log(arrayFaenas, arrayCargos)
      refreshDataCargos()

    }
    setFieldValue('faenas', arrayFaenas);
  }
  const handlerSelectCargo = (cargo) => {
    let arrayCargos = formik.values["cargos"]

    console.log(formik.values);
    if (!cargo.estado) {
      arrayCargos.push(cargo._id)
    } else {
      console.log("se borra")
      arrayCargos = arrayCargos.filter(item => item !== cargo._id)
      console.log(arrayCargos)
    }
    setFieldValue('cargos', arrayCargos);
  }

  function handleAnteriorButton() {
    if (currentPageForm > 0) { // pagina inicial
      setCurrentPageForm(currentPageForm - 1);
    }
  }

  const formularioParte1 = (
    <div>
      {/* Nombre de Archivo */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-8'>
          <CustomTextField name="nombre" disabled={!edit ? false : true} label="Nombre de Archivo" formik={formik} />
        </div>
        <div className='col-4'>
          <CustomTextField name="codigo" disabled={!edit ? false : true} label="Código" formik={formik} />
        </div>
      </div>

      {/* Tipo de Archivos */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <CustomSelect name="tipoArchivo" label="Tipo de Archivos" listaItems={tipoArchivosItems} formik={formik} />
        </div>
      </div>

      {/* El Archivo Tiene Caducidad */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-6'>
          <CustomSelect name="puedeVencer" label="El Archivo Tiene Caducidad" listaItems={nacionalidadItems} formik={formik} />
        </div>
        <div className='col-6'>
          <CustomSelect name="obligatorioAcreditacion" label="Obigatorio para acreditación" listaItems={nacionalidadItems} formik={formik} />
        </div>
      </div>
      {/* El Archivo Tiene Caducidad */}
      <div className='row d-flex justify-content-between mt-3'>

      </div>

    </div>
  );

  const formularioParte2 = (
    <div>
      {/* Ciudad de Residencia y Direccion de Residencia */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <Seleccionador titulo="Asigne el Exámen a la Faena" valores={faenas} setValores={setFaenas} onClickFaena={handlerSelectFaena} />
        </div>
      </div>
    </div>
  );

  const formularioParte3 = (
    <div>
      {/* Ciudad de Residencia y Direccion de Residencia */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          {cargosApi !== null ? <Seleccionador titulo="Asigne el Exámen a un cargo" valores={cargos} setValores={setCargos} onClickFaena={handlerSelectCargo} /> : <></>}

        </div>
      </div>
    </div>
  );

  const formularios = [formularioParte1, formularioParte2, formularioParte3];

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
            currentPageForm === 1 ? formularioParte2 : formularioParte3
        }
      </form>
      <div className={`d-flex mt-5 ${currentPageForm !== 0 ? "justify-content-between" : "justify-content-end"}`}>
        {currentPageForm !== 0 && <CustomButton typeColor="dark" icon={Icons.ArrowLeft} onClick={() => handleAnteriorButton()}>Volver</CustomButton>}
        <CustomButton icon={Icons.ArrowRight} endIcon={true} onClick={() => handleContinuarButton()}>Continuar</CustomButton>
      </div>
    </div>
  );
}





const steps = [
  {
    titulo: "Creación de Requisito",
    descripcion: "Nombre Archivo"
  },
  {
    titulo: "Asignar Requisito Faena",
    descripcion: "Agregarlo a las Faenas"
  },
  {
    titulo: "Asignar Requisito Cargo",
    descripcion: "Agregar"
  }
];