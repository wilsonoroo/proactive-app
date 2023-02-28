import { Button } from '@mui/material';
import './CustomButton.scss';

export default function CustomButton({ children, icon: IconProp, isLoading = false, onClick, endIcon = false, type, typeColor = "primary", isEnabled = true, login = false }) {

  const classNameStyle = `btn btn-${typeColor} px-2 py-2 d-flex align-items-center`;

  const typeColorMap = {
    "primary": "custom-button-primary",
    "dark": "custom-button-dark",
    "calipso": "custom-button-calipso"
  };

  return (
    <>
      {
        isLoading ?
          <button className={typeColorMap[typeColor]} onClick={onClick} disabled={isEnabled}>
            {children}
            <span className="spinner-border spinner-border-sm ms-2"></span>
          </button>
          :
          <Button disabled={!isEnabled} variant="contained"
            // type={type}
            type={type}
            onClick={onClick} style={{
              borderRadius: 18
            }}>
            {children}
          </Button>
        // <button className={typeColorMap[typeColor]} onClick={onClick} disabled={isEnabled}>
        //   {!endIcon && IconProp != null && <IconProp className="me-2" />}
        //   {children}
        //   {endIcon && IconProp != null && <IconProp className="ms-2" />}
        // </button>
      }
    </>
  );
}