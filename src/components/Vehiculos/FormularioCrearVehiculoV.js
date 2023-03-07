import { Box, Button, FormControlLabel, Grid, Step, StepLabel, Stepper, Switch } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomSelect from '../CustomInputs/CustomSelect';
import CustomSelectMultiple from '../CustomInputs/CustomSelectMultiple';
import CustomTextField from '../CustomInputs/CustomTextField';
import CustomDatePicker from '../CustomInputs/CustomDatePicker';
import { useEffect, useState } from 'react';
import { crearVehiculo } from "../../services/database/vehiculosServices"

export const FormularioCrearVehiculoV = (props) => {
    const uuid = require("uuid");
    const utils = props?.utils;
    // console.log(utils)

    
    const listTipos = Object.keys(utils.vehiculos?.tipo).map((key) => {
        const tipo = utils.vehiculos?.tipo[key];
        return {
          nombre: tipo.displayName,
          valor: tipo.id,
          tipoVehiculo: {...tipo.tipoVehiculo}
        };
    });   
    // console.log(listTipos)

    const validationSchema = yup.object({    
        tipo: yup
          .string('')
          .required("El tipo es obligatorio"),
        tipoVehiculo: yup
          .string('')
          .required("El tipo de vehículo es obligatorio"),
        patente: yup
          .string('')
          .required("La patente es obligatoria"),
        numeroInterno: yup
          .string('')
          .required("El numero interno es obligatorio"),
        marca: yup
          .string('')
          .required('Este campo es requerido'),
        modelo: yup
          .string('')
          .required("El modelo es obligatorio"),
        kilometraje: yup
          .number()
          .required("El kilometraje debe ser un valor numérico"),
        fechaVencimiento: yup
          .string()
          .required("El vencimiento de la revisión técnica es obligatorio"),
        // ultimaMantencion: yup
        //   .string('')
        //   .required('Este campo es requerido'),
        // proximaMantencion: yup
        //   .string('')
        //   .required('Este campo es requerido'),
      });

    const formik = useFormik({
        initialValues: { 
            id: uuid.v4(),
            tipo: '',
            tipoVehiculo: '',
            patente: '',
            numeroInterno: '',
            marca: '',
            modelo: '',
            kilometraje: '',
            fechaVencimiento: '',
            ultimaMantencion:'',
            proximaMantencion:'',
            isServicio: true,
            isEliminado: false,
            complementos: '', 
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values)
          const empresa = "shingeki_no_sushi";
          crearVehiculo(values, empresa)
          // resetForm();
        },
    });

    const [selectedItem, setSelectedItem] = useState('');
    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    }
    // console.log(selectedItem)


    const [listTipoVehiculo, setListTipoVehiculo] = useState([]);
    useEffect(() => {
        if (selectedItem !== undefined) {
          const tipoSeleccionado = listTipos.find(tipo => tipo.valor === selectedItem);
          if (tipoSeleccionado !== undefined) {
            // const tipoVehiculoSeleccionado = tipoSeleccionado.tipoVehiculo;
            setListTipoVehiculo(Object.keys(tipoSeleccionado.tipoVehiculo).map((key) => {
                const tipoV = tipoSeleccionado.tipoVehiculo[key];
                return {
                  nombre: tipoV.displayName,
                  valor: tipoV.id,
                };
            }));
            
          }
        }
    }, [selectedItem]);    
    // console.log(listTipoVehiculo)
    
  return (
    <>
        <form onSubmit={ formik.handleSubmit }>    

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                    control={
                    <Switch
                        checked={formik.values.isServicio}
                        onChange={(e) => {
                        formik.setFieldValue("isServicio", e.target.checked);
                        }}
                    />
                    }
                    label={formik.values.isServicio ? "Vigente" : "Fuera de servicio"}
                />
            </div>     
            
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomSelect name="tipo" label="Tipo" listaItems={listTipos} formik={formik} onChange={handleSelectChange}/>                    
                </div>
                <div className='col-6'>
                    <CustomSelect name="tipoVehiculo" label="Tipo de vehiculo" listaItems={listTipoVehiculo} formik={formik} />              
                </div>
            </div>

            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomTextField name="patente" label="Patente" formik={formik} />
                </div>
                <div className='col-6'>
                    <CustomTextField name="numeroInterno" label="N° Interno" formik={formik} />
                </div>
            </div>

            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomTextField name="marca" label="Marca" formik={formik} />
                </div>
                <div className='col-6'>
                    <CustomTextField name="modelo" label="Modelo" formik={formik} />
                </div>
            </div>

            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomTextField name="kilometraje" label="Kilometraje" formik={formik} />
                </div>
                <div className='col-6'>
                    <CustomDatePicker
                        style={{ width: "100%" }}
                        label="Vencimiento revisión técnica"
                        name="fechaVencimiento"
                        className="me-4"
                        defaultValue={""}
                        // value={fechaVencimiento}
                        onChange={(e) => {
                        formik.setFieldValue("fechaVencimiento", (e.target.value));
                        // console.log("onChange", e.target.value)
                    }} />
                </div>
            </div>

            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomDatePicker
                        style={{ width: "100%" }}
                        label="Última fecha de mantención"
                        name="ultimaMantencion"
                        className="me-4"
                        defaultValue={""}
                        // value={fechaVencimiento}
                        onChange={(e) => {
                        formik.setFieldValue("ultimaMantencion", (e.target.value));
                        // console.log("onChange", e.target.value)
                    }} />
                </div>
                <div className='col-6'>
                    <CustomDatePicker
                        style={{ width: "100%" }}
                        label="Fecha próxima mantención"
                        name="proximaMantencion"
                        className="me-4"
                        defaultValue={""}
                        // value={fechaVencimiento}
                        onChange={(e) => {
                        formik.setFieldValue("proximaMantencion", (e.target.value));
                        // console.log("onChange", e.target.value)
                    }} />
                </div>
            </div>
            
            <Grid container justifyContent="flex-end" style={{ marginTop: 20, bottom: 20, right: 20 }}>
                <Button type='submit' variant="contained" color="primary">Guardar</Button>
            </Grid>  

        </form>
    </>
  )
}


