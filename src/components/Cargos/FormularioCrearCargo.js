import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import * as yup from 'yup';
import useFetch from '../../hooks/useFetch';
import { actualizarCargo, crearCargoApi } from '../../services/cargos/cargos';
import { obtenerFaenasApi } from '../../services/faena/faenasApi';
import CustomButton from '../CustomButton/CustomButton';
import CustomTextField from '../CustomInputs/CustomTextField';
import Seleccionador from '../Seleccionador/Seleccionador';

export default function FormularioCrearCargo({ setOpenModal, setOpenModalMensaje, refreshData, data = null }) {
  const [currentPageForm, setCurrentPageForm] = useState(0);
  const [currentData, setCurrentData] = useState(data);
  const { data: faenasApi, firstLoading, refreshData: refreshDataFaenas } = useFetch(() => obtenerFaenasApi());
  const [faenas, setFaenas] = useState([]);

  const validationSchema = yup.object({
    nombre: yup
      .string('a')
      .required('Este campo es requerido'),


  });

  const formik = useFormik({
    initialValues: currentData ? { ...currentData, faenas: [], cargos: [] } : {
      nombre: "",
      descripcion: "",
      faenas: [

      ],
      isEliminado: false
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
        response = await crearCargoApi(values);
      } else {
        titulo = "!Excelente!"
        descripcion = "Se ha actualizado el Requisito. Por favor revisa la lista de requisitos para continuar."
        response = await actualizarCargo(values);
      }
      console.log(response)


      if (response.status === 201) {
        setOpenModal(false)
        setOpenModalMensaje({ titulo: titulo, descripcion: descripcion, isActive: true });
        refreshData()
      } else if (response.status === 200) {
        setOpenModal(false)
        setOpenModalMensaje({ titulo: titulo, descripcion: descripcion, isActive: true });
        refreshData()
      } else {
        setOpenModal(false)
        setOpenModalMensaje({ titulo: "!Algo ha salido mal!", descripcion: "No se ha creado un nuevo Perfil de Usuario. Por favor revisa la información ingresada.", isActive: true });
      }
      const data = await response;

    },
  });
  const { handleChange, submitForm, setFieldValue, touched, errors, values } = formik;

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



  useEffect(() => {
    if (!firstLoading) {
      console.log(faenas)
      setFaenas(
        faenasApi.map((item) => {
          return { ...item, estado: false }
        })
      )
    }
  }, [faenasApi, firstLoading])

  const handlerSelectFaena = (faena, index) => {

    let arrayFaenas = formik.values["faenas"]

    console.log(formik.values);
    if (!faena.estado) {
      arrayFaenas.push(faena._id)
    } else {
      console.log("se borra")
      arrayFaenas = arrayFaenas.filter(item => item !== faena._id)
      console.log(arrayFaenas)
    }
    setFieldValue('faenas', arrayFaenas);

  }


  const formularioParte1 = (
    <div>
      {/* Nombre de Archivo */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <CustomTextField name="nombre" label="Nombre del cargo" formik={formik} />
        </div>
      </div>
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>
          <CustomTextField name="descripcion" label="Descripción del cargo" formik={formik} />
        </div>
      </div>

      {/* Tipo de Archivos */}
      <div className='row d-flex justify-content-between mt-3'>
        <div className='col-12'>

          <Seleccionador titulo="Asigne El Cargo a un(as) Faena(s)" valores={faenas} setValores={setFaenas} onClickFaena={handlerSelectFaena} />
        </div>
      </div>


    </div>
  );


  const formularios = [formularioParte1];

  return (
    <div>
      <div className='row'>
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
