import './EnviarMensaje.scss';

import { useFormik } from 'formik';
import { useState } from "react";
import * as Icons from 'react-feather';
import * as yup from 'yup';
import { enviarMensaje } from '../../api/solicitudes/solicitud';
import WhatsappIcon from '../../assets/whatsapp.svg';
import CustomButton from "../CustomButton/CustomButton";
import CustomTextField from '../CustomInputs/CustomTextField';
import CustomModal from "../CustomModal/CustomModal";

export default function EnviarMensaje({ proyecto, faena, nombre, sueldo, cargo, fecha, usuario, idSolicitud }) {
  const [openModal, setOpenModal] = useState(false);


  const validationSchema = yup.object({
    monto: yup.string('').required('Este campo es requerido'),

  });
  const formik = useFormik({
    initialValues: {
      monto: "",
      telefono: usuario.telefono,
      nombreUsuario: nombre,
      nombreProyecto: proyecto,
      fecha: fecha

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values))
      console.log({
        ...values, telefono: usuario.telefono,
        nombreUsuario: nombre,
        nombreProyecto: proyecto,
        fecha: fecha
      })

      enviarMensaje({
        ...values, telefono: usuario.telefono,
        nombreUsuario: nombre,
        nombreProyecto: proyecto,
        fecha: fecha,
        payload: idSolicitud
      })

    },


  });
  return (
    <div>
      <div onClick={() => setOpenModal(true)}>
        <Icons.MessageSquare color='#0080FF' />
      </div>
      {/* <CustomButton typeColor="calipso" icon={Icons.MessageCircle} endIcon={true} onClick={() => setOpenModal(true)}>Enviar</CustomButton> */}
      <CustomModal
        titulo={`${proyecto}`}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <div className="d-flex justify-content-center">
          <div className="text-center container-relative_enviar-mensaje">
            <img src={WhatsappIcon} alt="WhatsappIcon" className="container-absolute_enviar-mensaje" height={50} />
            <div className="fw-bold">Mensaje de Whatsapp</div>
            <div>especial</div>
          </div>
        </div>
        <br />
        <div className='text-center'>
          Estimad@ <span className="color-primary">{nombre}</span>, se le invita a participar del proyecto
          <span className="fw-bold">"{proyecto} {faena}"</span>,
          con inicio el día  <span className="color-primary fw-bold">{fecha}</span>.
        </div>
        <br />
        <div className='text-center'>
          Tiene contemplado trabajar como <span className="fw-bold">{cargo}</span>,
          con un sueldo líquido de <span className="color-primary fw-bold">
            <CustomTextField name="monto" label="Sueldo Liquido" formik={formik} />
            {/* {utils.formatoPrecio(sueldo)} CLP */}
          </span>.
        </div>
        <br />
        <div className='text-center'>
          Necesitamos que <span className="fw-bold">confirme su participación</span>, a través de este mismo medio, con el fin de asegurar su contratación. Muchas gracias, y esperamos su pronta respuesta.
        </div>
        <br />
        <div className="d-flex justify-content-end">
          <CustomButton typeColor="calipso" icon={Icons.ChevronRight} endIcon={true} onClick={() => formik.submitForm()}>Enviar</CustomButton>
        </div>
      </CustomModal>
    </div>
  );
}