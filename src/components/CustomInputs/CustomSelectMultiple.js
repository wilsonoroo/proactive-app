
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

export default function CustomSelectMultiple({ name, label, formik = null, listaItems, onChange = null }) {

  const onChangeInterno = (e) => {
    e.preventDefault();
    if (onChange !== null) {
      onChange(e)
    }
  }
  return (
    <FormControl fullWidth>
      <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
      <Select
        defaultValue={""}
        labelId={`select-label-${name}`}
        id={`select-${name}`}
        value={formik?.values[name] || []}
        name={name}
        multiple={true} // habilita la selección múltiple
        MenuProps={{
          disableScrollLock: true,
        }}
        label={label}
        onChange={(e) => { formik?.handleChange(e); onChangeInterno(e); }}
        error={formik?.touched[name] && Boolean(formik?.errors[name])}
      >
        {
          listaItems.map((element, index) => {
            return <MenuItem key={index} value={element.valor}>{element.nombre}</MenuItem>
          })
        }
      </Select>
    </FormControl >
  );
}
CustomSelectMultiple.propTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.any,
    handleChange: PropTypes.func,
    touched: PropTypes.any,
    values: PropTypes.any
  }),
  label: PropTypes.any,
  listaItems: PropTypes.shape({
    map: PropTypes.func
  }),
  name: PropTypes.any,
  onChange: PropTypes.func
}
