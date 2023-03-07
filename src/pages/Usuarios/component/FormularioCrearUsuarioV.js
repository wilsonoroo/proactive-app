import { Button, FormControlLabel, Grid, Switch } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as yup from 'yup';
import CustomDatePicker from '../../../components/CustomInputs/CustomDatePicker';
import CustomSelect from '../../../components/CustomInputs/CustomSelect';
import CustomSelectMultiple from '../../../components/CustomInputs/CustomSelectMultiple';
import CustomTextField from '../../../components/CustomInputs/CustomTextField';
import { guardarDatosEnFirebase } from '../../../services/database/usuariosServices';

export const FormularioCrearUsuarioV = (props) => {

    const utils = props?.utils;
    // const rolesList = Object.keys(utils.usuarios.roles).map((key) => utils.usuarios.roles[key]);
    const rolesListName = Object.keys(utils.usuarios.roles).map((key) => {
        const rol = utils.usuarios.roles[key];
        return {
            nombre: rol.displayName,
            valor: rol.id,
        };
    });
    const permisosListName = Object.keys(utils.usuarios.permisos).map((key) => {
        const permiso = utils.usuarios.permisos[key];
        return {
            nombre: permiso.displayName,
            valor: permiso.id,
        };
    });
    const listCargos = Object.keys(utils.usuarios.cargos).map((key) => {
        const cargo = utils.usuarios.cargos[key];
        return {
            nombre: cargo.displayName,
            valor: cargo.id,
        };
    });
    const listAreasCargo = Object.keys(utils.usuarios.areasCargo).map((key) => {
        const acargo = utils.usuarios.areasCargo[key];
        return {
            nombre: acargo.displayName,
            valor: acargo.id,
        };
    });
    const listTurnos = Object.keys(utils.usuarios.turnos).map((key) => {
        const turno = utils.usuarios.turnos[key];
        return {
            nombre: turno.displayName,
            valor: turno.id,
        };
    });

    // console.log(rolesListName, permisosListName)
    // console.log(rolesList)
    const validationSchema = yup.object({
        displayName: yup.string()
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(15, 'El nombre debe tener menos de 15 caracteres')
            .required('El nombre es requerido')
            .test('no-numbers', 'El nombre no puede tener numeros', value => !/\d/.test(value)),
        rut: yup
            .string('a')
            .required('Este campo es requerido'),
        email: yup.string()
            .email('El correo electrónico debe ser válido')
            .required('El correo electrónico es requerido'),
        // .test('email-exists', 'Este correo ya esta en uso', checkEmailExists),
        sexo: yup
            .string('a')
            .required('Este campo es requerido'),
        codigo: yup
            .string('')
            .required('Este campo es requerido'),
        rol: yup
            .string('')
            .required('Este campo es requerido'),
        // permisos: yup
        //   .string('')
        //   .required('Este campo es requerido'),
        cargo: yup
            .string('')
            .required('Este campo es requerido'),
        areaCargo: yup
            .string('')
            .required('Este campo es requerido'),
        turno: yup
            .string('')
            .required('Este campo es requerido'),
        licencia: yup
            .string('')
            .required('Este campo es requerido'),
        fechaVencimientoLicencia: yup
            .string('')
            .required('Este campo es requerido'),
        password: yup
            .string('')
            .required('Este campo es requerido'),
        confirmPassword: yup
            .string('')
            .required('Este campo es requerido')
            .test('passwords-match', 'Las contraseñas no coinciden', function (value) {
                return this.parent.password === value;
            }),
    });

    const formik = useFormik({
        initialValues: {
            //   id:'',
            displayName: '',
            rut: '',
            email: '',
            sexo: '',
            codigo: '',
            rol: '',
            isActive: true,
            isEliminado: false,
            permisos: [],
            cargo: '',
            areaCargo: '',
            turno: '',
            cuadrilla: '',
            licencia: '',
            fechaVencimientoLicencia: '',
            password: "",
            confirmPassword: "",
            //   empresa: config.nombre,
            //   empresaId: config.id,

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const empresa = "shingeki_no_sushi";
            console.log(values, empresa)

            guardarDatosEnFirebase(values, empresa)
            //   resetForm();
        },
        // validationSchema,    

    });
    const generos = [{ nombre: "Fememino", valor: "femenino" }, { nombre: "Masculino", valor: "masculino" }, { nombre: "No binario", valor: "no binario" }]
    const licencia = [{ nombre: "Si", valor: "si" }, { nombre: "No", valor: "no" }]


    const [tieneLicencia, setTieneLicencia] = useState(false);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formik.values.isActive}
                                onChange={(e) => {
                                    formik.setFieldValue("isActive", e.target.checked);
                                }}
                            />
                        }
                        label={formik.values.isActive ? "Usuario activo" : "Usuario inactivo"}
                    />
                </div>
                <div className='row d-flex justify-content-between mt-3'>
                    <div className='col-6'>
                        <CustomTextField name="displayName" label="Nombre" formik={formik} />
                    </div>
                    <div className='col-6'>
                        <CustomTextField name="rut" label="Rut" formik={formik} />
                    </div>
                </div>
                <div className='row d-flex justify-content-between mt-3'>
                    <div className='col-6'>
                        <CustomTextField name="email" label="Correo" formik={formik} />
                    </div>
                    <div className='col-6'>
                        <CustomSelect name="sexo" label="Genero" listaItems={generos} formik={formik} />
                    </div>
                </div>
                <div className='row d-flex justify-content-between mt-3'>
                    <div className='col-6'>
                        <CustomTextField name="codigo" label="Codigo" formik={formik} />
                    </div>
                    <div className='col-6'>
                        <CustomSelect name="rol" label="Rol" listaItems={rolesListName} formik={formik} />
                    </div>
                </div>
                <div className='row d-flex justify-content-between mt-3'>
                    <div className='col-6'>
                        <CustomSelectMultiple name="permisos" label="Permisos" listaItems={permisosListName} formik={formik} />
                    </div>
                    <div className='col-6'>
                        <CustomSelect name="cargo" label="Ingrese el cargo del usuario" listaItems={listCargos} formik={formik} />
                    </div>
                </div>
                <div className='row d-flex justify-content-between mt-3'>
                    <div className='col-6'>
                        <CustomSelect name="areaCargo" label="Ingrese el area a cargo" listaItems={listAreasCargo} formik={formik} />
                    </div>
                    <div className='col-6'>
                        <CustomSelect name="turno" label="Turno" listaItems={listTurnos} formik={formik} />
                    </div>
                </div>
                <div className='row d-flex justify-content-between mt-3'>
                    <div className='col-6'>
                        <CustomSelect
                            name="licencia"
                            label="Posee o no licencia interna"
                            listaItems={licencia}
                            formik={formik}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTieneLicencia(value === "si");
                            }}
                        />
                    </div>
                    <div className='col-6'>
                        <CustomDatePicker
                            style={{ width: "100%" }}
                            label="Vencimiento licencia interna"
                            name="fechaVencimientoLicencia"
                            className="me-4"
                            defaultValue={""}
                            disabled={!tieneLicencia}
                            // value={fechaVencimiento}
                            onChange={(e) => {
                                formik.setFieldValue("fechaVencimientoLicencia", Date.parse(e.target.value));
                                // console.log("onChange", e.target.value)
                            }}
                        />
                    </div>
                </div>

                <div className='row d-flex justify-content-between mt-3'>
                    <div className='col-6'>
                        <CustomTextField name="password" label="Password" formik={formik} />
                    </div>
                    <div className='col-6'>
                        <CustomTextField name="confirmPassword" label="Confirmar Password" formik={formik} />
                    </div>
                </div>

                <Grid container justifyContent="flex-end" style={{ marginTop: 20, bottom: 20, right: 20 }}>
                    <Button type='submit' variant="contained" color="primary">Guardar</Button>
                </Grid>

            </form>
        </>
    )
}



FormularioCrearUsuarioV.propTypes = {
    utils: PropTypes.object
};