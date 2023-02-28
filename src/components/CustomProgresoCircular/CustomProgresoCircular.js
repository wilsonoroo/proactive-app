import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import './CustomProgresoCircular.scss';

export default function CustomProgresoCircular({ valor = 100, size = 1 }) {

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

  function getColorCircularProgress(value) {
    if (value === 1) {
      return "success"
    } else if (value >= 0 && value < 0.5) {
      return "error"
    } else if (value >= 0.5) {
      return "warning"
    } else {
      return "primary"
    }
  }

  return (
    <div className='d-flex justify-content-end'>
      <div className='container-circular-progess d-flex justify-content-center align-items-center'>
        <CircularProgress color={getColorCircularProgress(valor)} variant="determinate" value={valor * 100} className="container-circular" size={settingSize[size].size * 4} />
        <Typography variant="caption" component="div" color="text.secondary" fontSize={settingSize[size].size} className="container-porcentaje fw-bold">
          {`${Math.round(valor * 100)}%`}
        </Typography>
      </div>
    </div>
  );
}