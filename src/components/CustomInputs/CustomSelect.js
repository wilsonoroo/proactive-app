import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CustomSelect({ name, label, formik = null, listaItems, onChange = null }) {

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
        value={formik?.values[name]}
        name={name}
        MenuProps={{
          disableScrollLock: true,
        }}
        label={label}
        onChange={(e) => { console.log(e, formik); formik?.handleChange(e); onChangeInterno(e); }}
        error={formik?.touched[name] && Boolean(formik?.errors[name])}

      // helperText={formik.touched[name] && formik.errors[name]}
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