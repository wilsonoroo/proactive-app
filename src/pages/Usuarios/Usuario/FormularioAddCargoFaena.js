
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import { obtenerCargosPorFaenas } from '../../../api/cargos/cargos';
import { obtenerFaenasApi } from '../../../api/faena/faenasApi';
import { actualizarPersonal } from '../../../api/personal/personal';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Seleccionador from '../../../components/Seleccionador/Seleccionador';
import useFetch from '../../../hooks/useFetch';


export default function FormularioAddCargoFaena({ setOpenModal, setOpenModalMensaje, refreshData, data = null }) {

    const [currentData, setCurrentData] = useState(data);

    const [faenaSelect, setFaenaSelect] = useState(null);
    const { data: faenasApi, firstLoading, refreshData: refreshDataFaenas } = useFetch(() => obtenerFaenasApi());
    const { data: cargosApi, firstLoading: firstLoadingCargos, refreshData: refreshDataCargos } = useFetch(() => obtenerCargosPorFaenas(faenaSelect));

    const [faenas, setFaenas] = useState([]);
    const [cargos, setCargos] = useState([]);




    const formik = useFormik({
        initialValues: currentData ? { ...data, faenasCompatibles: [], cargosCompatibles: [] } : {
            faenasCompatibles: [],
            cargosCompatibles: []
        },
        onSubmit: async (values) => {

            let response;
            let titulo;
            let descripcion;

            console.log(values)
            titulo = "!Excelente!"
            descripcion = "Se ha actualizado el Usuario. Por favor revisa la lista de requisitos para continuar."
            response = await actualizarPersonal(values);



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
            // const data = await response;
        },
    });



    const { setFieldValue } = formik;


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
        formik.handleSubmit();
    }

    const handlerSelectFaena = (faena) => {
        let arrayFaenas = formik.values["faenasCompatibles"]
        let arrayCargos = formik.values["cargosCompatibles"]
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

            setFieldValue('cargosCompatibles', arrayCargos);
            refreshDataCargos()

        }
        setFieldValue('faenasCompatibles', arrayFaenas);
    }
    const handlerSelectCargo = (cargo) => {
        let arrayCargos = formik.values["cargosCompatibles"]

        if (!cargo.estado) {
            arrayCargos.push(cargo._id)
        } else {
            console.log("se borra")
            arrayCargos = arrayCargos.filter(item => item !== cargo._id)
            console.log(arrayCargos)
        }
        setFieldValue('cargosCompatibles', arrayCargos);
    }




    const formularioParte2 = (
        <div>
            {/* Ciudad de Residencia y Direccion de Residencia */}
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <Seleccionador titulo="Asocie Faena a Usuario" valores={faenas} setValores={setFaenas} onClickFaena={handlerSelectFaena} />
                </div>
                <div className='col-6'>
                    {!firstLoadingCargos || cargosApi !== null ? <Seleccionador titulo="Asocie Cargo a Usuario" valores={cargos} setValores={setCargos} onClickFaena={handlerSelectCargo} /> : <></>}

                </div>
            </div>
        </div>
    );


    return (
        <div>

            <form onSubmit={formik.handleSubmit} autoComplete="off">
                {
                    formularioParte2
                }
            </form>
            <div className={`d-flex mt-5 justify-content-end }`}>
                <CustomButton icon={Icons.ArrowRight} endIcon={true} onClick={() => handleContinuarButton()} >Guardar</CustomButton>
            </div>
        </div>
    );
}





