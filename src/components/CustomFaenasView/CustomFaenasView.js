import { Chip, Grid, Typography } from '@mui/material';
import './CustomProgresoCircular.scss';

export default function CustomFaenasView({ valor }) {

  const settingSize = {
    1: {
      size: 13
    },
    2: {
      size: 20
    },
    3: {
      size: 30
    }
  };




  return (
    <>
      <Grid container spacing={2} rowSpacing={1} pt={1} pb={1}>
        {typeof valor !== "undefined" ?
          valor.length === 0 ?
            <Grid key={0} item >
              <Typography variant="caption" >
                {`Sin Faenas Asociadas`}
              </Typography>
            </Grid>
            :


            valor.map((item, index) => {
              return <Grid key={index} item ><Chip pt={5} pb={5} pdl={5} label={`${item.nombre} - ${item.abreviatura}`} variant="outlined" color="secondary" /></Grid>
            })


          :
          <></>
        }


      </Grid>
    </>
  );
}