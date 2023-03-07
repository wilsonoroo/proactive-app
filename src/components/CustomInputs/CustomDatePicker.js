import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";

export default function CustomDatePicker({ name, label, defaultValue = "2017-05-24", formik, ...props }) {
  return (
    <TextField
      {...props}
      id={name}
      name={name}
      label={label}
      type="date"
      defaultValue={defaultValue}
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

CustomDatePicker.propTypes = {
  defaultValue: PropTypes.string,
  formik: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any
}


export function CustomDatePickerFormik({ name, label, defaultValue = "2017-05-24", formik, ...props }) {
  return (
    <TextField
      {...props}
      id={name}
      name={name}
      label={label}
      type="date"
      onChange={formik.handleChange}
      value={formik.values[name]}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      defaultValue={defaultValue}
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

CustomDatePickerFormik.propTypes = {
  defaultValue: PropTypes.string,
  formik: PropTypes.shape({
    errors: PropTypes.any,
    handleChange: PropTypes.any,
    touched: PropTypes.any,
    values: PropTypes.any
  }),
  label: PropTypes.any,
  name: PropTypes.any
}
