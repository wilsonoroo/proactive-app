import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import * as yup from 'yup';
import { actualizarFaena, crearFaena } from '../../api/faena/faenasApi';
import { obtenerResponsables } from '../../api/personal/personal';
import useFetch from '../../hooks/useFetch';
import CustomButton from '../CustomButton/CustomButton';
import CustomSelect from '../CustomInputs/CustomSelect';
import CustomTextField from '../CustomInputs/CustomTextField';

export default function FormularioTemplateName({ setOpenModal, setOpenModalMensaje, refreshData, data = null }) {
    const [currentPageForm, setCurrentPageForm] = useState(0);
    const [listaResponsables, setListaResponsables] = useState([])
    const [currentData, setCurrentData] = useState(data);
    const [isErrorFormParte1, setIsErrorFormParte1] = useState(false);
    const [isErrorFormParte2, setIsErrorFormParte2] = useState(false);

    const { data: responsables, firstLoading } = useFetch(() => obtenerResponsables());


    const validationSchema = yup.object({
        nombre: yup
            .string()
            .required('Este campo es requerido'),
        ubicacion: yup
            .string()
            .required('Este campo es requerido'),
        abreviatura: yup
            .string()
            .required('Este campo es requerido'),
        responsable: yup
            .string()
            .required('Este campo es requerido'),
    });

    useEffect(() => {

        if (responsables !== null) {
            setListaResponsables(responsables.map((value) => {
                return { ...value, valor: value._id, nombre: value.name }
            }))
        }
    }, [responsables])

    const formik = useFormik(currentData ? { ...currentData, faenas: [], cargos: [] } : {
        initialValues: {
            nombre: "",
            ubicacion: "",
            abreviatura: "",
            responsable: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(currentData)
            } catch (erro) {
                console.log(erro)
            }

            console.log(values)

            let response;
            let titulo;
            let descripcion;

            if (currentData === null) {
                console.log("data!==null")
                titulo = "!Excelente!"
                descripcion = "Se ha creado un nuevo Requisito. Por favor revisa la lista de requisitos para continuar."
                response = await crearFaena(values);
            } else {
                titulo = "!Excelente!"
                descripcion = "Se ha actualizado el Requisito. Por favor revisa la lista de requisitos para continuar."
                response = await actualizarFaena(values);
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

    function handleContinuarButton() {
        console.log(formik.values)
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
            {/* Nombre de Archivo */}
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-12'>
                    <CustomTextField name="nombre" label="Nombre de la Faena / Planta Industrial" formik={formik} />
                </div>
            </div>

            {/* Tipo de Archivos */}
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-12'>
                    <CustomTextField name="ubicacion" label="Ubicación" formik={formik} />
                </div>
            </div>
            {/* Tipo de Archivos */}
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomTextField name="abreviatura" label="abreviatura" formik={formik} />
                </div>
                <div className='col-6'>
                    <CustomSelect name="responsable" label="Responsable de Acreditación" listaItems={listaResponsables} formik={formik} />
                </div>
            </div>


        </div >
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

const nacionalidadItems = [{ nombre: "Chile", valor: "chile" }, { nombre: "Peru", valor: "peru" }, { nombre: "Colombia", valor: "colombia" }]
const estadoCivilItems = [{ nombre: "Soltero", valor: "soltero" }, { nombre: "Casado", valor: "casado" }, { nombre: "Viudo", valor: "viudo" }]
const AFPitems = [{ nombre: "AFP Habitat", valor: "afp_habitat" }, { nombre: "AFP Salud", valor: "afp_pro_salud" }, { nombre: "AFP + Vida", valor: "afp_+_vida" }]
const previsionItems = [{ nombre: "Fonasa", valor: "fonasa" }, { nombre: "ISAPRE", valor: "isapre" },]
const ciudadItems = [{ nombre: "Calama", valor: "calama" }, { nombre: "Antofagasta", valor: "antofagasta" }, { nombre: "Santiago", valor: "santiago" }, { nombre: "La Serena", valor: "La Serena" }]
const profesionItems = [{ nombre: "Doctor", valor: "doctor" }, { nombre: "Dentista", valor: "dentista" }, { nombre: "Mecanico", valor: "mecanico" }, { nombre: "Abogado", valor: "abogado" },]