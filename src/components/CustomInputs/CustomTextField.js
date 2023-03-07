import { TextField } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import PropTypes from "prop-types";

const theme = createTheme({
  components: {
    // CTRL + SPACE to find the component you would like to override.
    // For most of them you will need to adjust just the root...
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#c4c4c4',
          },
          '& label.Mui-focused': {
            color: '#746666',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#3E68A8',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3E68A8',
            },
            '&:hover fieldset': {
              borderColor: '#3E68A8',
              borderWidth: '0.15rem',
            },
            '&.Mui-focused fieldset': {
              borderWidth: "1px",
              borderColor: '#c4c4c4',
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
          fontSize: '1rem',
        },
      },
    },
  },
});

export default function CustomTextField({ name, label, formik, placeholder = "", type = "text", disabled = false }) {
  return (

    // <ThemeProvider theme={theme}>
    <TextField
      label={label}
      value={formik.values[name]}
      name={name}
      type={type}
      inputProps={type === "number" ? { inputMode: 'numeric', pattern: '[0-9]*' } : {}}
      disabled={disabled}
      onChange={formik.handleChange}
      variant='outlined'
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      fullWidth={true}
    // focused={true}
    // placeholder={placeholder}
    />
    // </ThemeProvider>
  );
}
CustomTextField.propTypes = {
  disabled: PropTypes.bool,
  formik: PropTypes.shape({
    errors: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any
  }),
  label: PropTypes.any,
  name: PropTypes.any,
  placeholder: PropTypes.string,
  type: PropTypes.string
}
