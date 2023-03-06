import { Button, FormControlLabel, Grid, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import CustomSelect from '../CustomInputs/CustomSelect'
import CustomTextField from '../CustomInputs/CustomTextField'

export const FormularioCrearFaenaV = (props) => {

    const utils = props?.utils;
    const listRegiones = Object.keys(utils?.faenas?.regiones).map((key) => {
        const region = utils?.faenas?.regiones[key];
        return {
          nombre: region.displayName,
          valor: region.id,
          comunas: {...region.comunas}
        };
    });
    const listTipos = Object.keys(utils?.faenas?.tipo).map((key) => {
        const tipo = utils?.faenas?.tipo[key];
        return {
          nombre: tipo.displayName,
          valor: tipo.id,
        };
    });
    // console.log(listRegiones, listTipos)

    const validationSchema = yup.object({        
        nombre: yup
          .string('')
          .required('Este campo es requerido'),
        abreviatura: yup
          .string('')
          .required('Este campo es requerido'),
        region: yup
          .string('')
          .required('Este campo es requerido'),
        comuna: yup
          .string('')
          .required('Este campo es requerido'),
        tipoFaena: yup
          .string('')
          .required('Este campo es requerido'),        
    });

    const formik = useFormik({
        initialValues: {
        //   id:'',
          nombre: '',
          abreviatura: '',
          region: '',
          comuna: '',  
          tipoFaena: '', 
          isVigente: true,
          isEliminado: false,        
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values)
        //   guardarRegistro(values.nombre, values.email, values.edad, values.empresa, values.calzado );
          
        //   resetForm();
        },         
    });

    const [selectedItem, setSelectedItem] = useState('');
    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    }
    // console.log(selectedItem)

    const [listComuna, setListComuna] = useState([]);
    useEffect(() => {
        if (selectedItem !== undefined) {
          const regionSeleccionada = listRegiones.find(tipo => tipo.valor === selectedItem);
          if (regionSeleccionada !== undefined) {
            // const tipoVehiculoSeleccionado = regionSeleccionada.tipoVehiculo;
            setListComuna(Object.keys(regionSeleccionada.comunas).map((key) => {
                const tipoV = regionSeleccionada.comunas[key];
                return {
                  nombre: tipoV.displayName,
                  valor: tipoV.id,
                };
            }));
            
          }
        }
    }, [selectedItem]);  
    // console.log(listComuna)

  return (
    <>
        <form onSubmit={ formik.handleSubmit }>   

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                    control={
                    <Switch
                        checked={formik.values.isVigente}
                        onChange={(e) => {
                        formik.setFieldValue("isVigente", e.target.checked);
                        }}
                    />
                    }
                    label={formik.values.isVigente ? "Vigente" : "Fuera de servicio"}
                />
            </div>            
            
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomTextField name="nombre" label="Nombre faena" formik={formik} />
                </div>
                <div className='col-6'>
                    <CustomTextField name="abreviatura" label="Abreviatura" formik={formik} />
                </div>
            </div>
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomSelect name="region" label="Region" listaItems={listRegiones} formik={formik} onChange={handleSelectChange}/>
                </div>
                <div className='col-6'>
                    <CustomSelect name="comuna" label="Comuna" listaItems={listComuna} formik={formik} />
                </div>
            </div>
            <div className='row d-flex justify-content-between mt-3'>
                <div className='col-6'>
                    <CustomSelect name="tipoFaena" label="Tipo de faena" listaItems={listTipos} formik={formik} />
                </div>
            </div>
            

            <Grid container justifyContent="flex-end" style={{ marginTop: 20, bottom: 20, right: 20 }}>
                <Button type='submit' variant="contained" color="primary">Guardar</Button>
            </Grid> 
            
        </form>
    
    
    </>
  )
}
