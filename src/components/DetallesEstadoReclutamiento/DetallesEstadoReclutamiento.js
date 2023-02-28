import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import CustomProgresoCircular from '../CustomProgresoCircular/CustomProgresoCircular';
import MaterialContainer from '../MaterialContainer/MaterialContainer';
import StatusItem from '../StatusItem/StatusItem';
import './DetallesEstadoReclutamiento.scss';

export default function DetallesEstadoReclutamiento({ cargosSolicitados, detalles, cantidadTotal, cantVerificados }) {


  const [asignados, setAsignados] = useState(0)


  useEffect(() => {
    let cantAsignados = 0
    detalles
      .map((elemento, index) => {
        cantAsignados += elemento.personal.length
      })
    setAsignados(cantAsignados)
  }, [detalles])

  console.log(cantVerificados / cantidadTotal, cantVerificados, cantidadTotal)
  console.log(asignados / cantidadTotal)
  return (
    <MaterialContainer textoIzquierda="Estado del Proyecto">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"

      >

        {/* SECCION IZQUIERDA */}
        <Grid item container md={8.5} >
          <Grid item container pb={2} md={13} columns={13}>
            <Grid item xs={5.5} sm={5.5} md={5.5} container spacing={1}
              alignItems="flex-start" >
              <Grid item md={2}>  <Typography variant="body2" gutterBottom>Status</Typography></Grid>
              <Grid item md={6}>  <Typography variant="body2" gutterBottom>Cargos Requeridos</Typography></Grid>
              <Grid item md={2}>  <Typography variant="body2" gutterBottom>Agreg.</Typography></Grid>
              <Grid item md={2}> <Typography variant="body2" gutterBottom align="center">Acredi.</Typography></Grid>
            </Grid>
            <Grid item xs={0.5} sm={0.5} md={0.5} container spacing={1}>

            </Grid>
            <Grid item xs={5.5} sm={5.5} md={5.5} container spacing={1}
              alignItems="flex-start" >
              <Grid item md={2}>  <Typography variant="body2" gutterBottom>Status</Typography></Grid>
              <Grid item md={6}>  <Typography variant="body2" gutterBottom>Cargos Requeridos</Typography></Grid>
              <Grid item md={2}>  <Typography variant="body2" gutterBottom>Agreg.</Typography></Grid>
              <Grid item md={2}> <Typography variant="body2" gutterBottom align="center">Acredi.</Typography></Grid>
            </Grid>
          </Grid>

          <Grid item container spacing={{ xs: 1, md: 1 }} md={13} columns={13}>
            {
              cargosSolicitados
                .map((elemento, index) => {

                  let color = elemento.cantidadAcreditada === 0 ? "red" : (elemento.cantidadAcreditada > 0 && elemento.cantidadAcreditada < elemento.cantidad) ? "#F27B13" : "#4ACBA8"
                  let colorAdd = elemento.personal.length === 0 ? "red" : (elemento.personal.length < elemento.cantidad) ? "#F27B13" : "primary"

                  return (
                    elemento.cantidad !== 0 ?
                      <>
                        <Grid item xs={5.5} sm={5.5} md={5.5} key={index} container spacing={1}
                          alignItems="center" >
                          <Grid item md={2} pl={1}> <StatusItem typeColor={elemento.personal.length >= elemento.cantidad ? "verde" : "rojo"} /></Grid>
                          <Grid item md={6}> <Typography fontWeight={"bold"} variant="body2" color={"#000"} gutterBottom >{elemento.cargo?.nombre}</Typography></Grid>
                          <Grid item md={2}>
                            <Typography fontWeight={"bold"} variant="body2" color={colorAdd} gutterBottom >
                              {elemento.personal.length.toString().padStart(2, "0")} / {elemento.cantidad.toString().padStart(2, "0")}</Typography>
                          </Grid>
                          <Grid item md={2}> <Typography fontWeight={"bold"} variant="body2"
                            color={color} gutterBottom align="center">{elemento.cantidadAcreditada.toString().padStart(2, "0")}</Typography></Grid>
                        </Grid>
                        <Grid item s={0.5} sm={0.5} md={0.5} key={`div-${index}`} container spacing={1}>
                          <Divider orientation="vertical" flexItem style={{ borderColor: "black" }} />
                        </Grid>
                      </> : <></>
                  );
                })
            }
          </Grid>
        </Grid>
        <Grid item container md={3.5}>
          <Grid md={3} alignItems="center" justifyContent="center" container>
            <CustomProgresoCircular size={2} valor={cantidadTotal !== 0 || cantidadTotal ? (asignados / cantidadTotal) : 0} />
            <Grid item><Typography align="center" fontWeight={"bold"} variant="body2" gutterBottom >{"% Asignados "}</Typography></Grid>
          </Grid>
          <Grid md={3} alignItems="center" justifyContent="center" container>
            <CustomProgresoCircular size={2} valor={cantidadTotal !== 0 ? (cantVerificados / cantidadTotal) : 0} />
            <Grid item><Typography fontWeight={"bold"} align="center" variant="body2" gutterBottom >{"% Verificados "}</Typography></Grid>
          </Grid>
          <Grid md={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Grid item direction="row" container>
                <Icons.UserPlus className='me-2' />
                <Typography variant="body2" gutterBottom>Verificados</Typography>
              </Grid>
              <Grid item>
                <span className='fw-bold'>{cantVerificados}</span>
              </Grid>
            </Grid>



          </Grid>
          <div className='row mt-4'>
            <div className='col-12 d-flex justify-content-center'>
              <div className='fw-bold'>Total <span className='text-primary'>{cantVerificados}</span> Acreditados de {cantidadTotal} Requeridos</div>
            </div>
            <div className='col-12 d-flex justify-content-center'>
              <div> <span className='text-primary'>{asignados}</span> Agregados de {cantidadTotal} Requeridos</div>
            </div>
          </div>
        </Grid>


      </Grid>
    </MaterialContainer >
  );
}