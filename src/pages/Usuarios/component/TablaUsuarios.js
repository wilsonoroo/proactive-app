import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTrabajador } from "../../../api/usuariosAPI";
import CustomInput from "../../../components/CustomInputs/CustomInput";
import CustomMaterialTable from "../../../components/CustomMaterialTable/CustomMaterialTable";
import Loading from "../../../components/Loading";




export default function TablaUsuarios({ usuarios, refreshData, loadingData }) {
  const navigate = useNavigate();

  const [inputSearchValue, setInputSearchValue] = useState(null);
  const [dataUser, setDataUser] = useState({ data: [], loading: false });
  const [debouncedTerm, setDebouncedTerm] = useState(inputSearchValue);
  useEffect(() => {
    console.log("=>>init", dataUser, usuarios.length)
    setDataUser({ data: usuarios, loading: loadingData })
  }, [])

  useEffect(() => {
    console.log("=>>usuarios", { ...dataUser, data: usuarios }, usuarios.length)
    setDataUser({ ...dataUser, data: usuarios })
  }, [usuarios])

  useEffect(() => {
    console.log("=>>loading", { ...dataUser, loading: usuarios }, usuarios.length)
    setDataUser({ ...dataUser, loading: loadingData })
  }, [loadingData])
  console.log(dataUser, usuarios.length)

  useEffect(() => {
    console.log(inputSearchValue)
    const timer = setTimeout(() => filterUsuarios(), 1000);
    return () => clearTimeout(timer);
  }, [inputSearchValue])


  const dataFilters = (e) => {
    if (inputSearchValue.length !== 0) {
      if (e.nombre || e.correo || e.rut) {
        if (e.rut.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.nombres.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.correo.toLowerCase().includes(inputSearchValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    }
    return true


  }

  const handleEliminar = (idUsuario) => {
    console.log("=>>handleEliminar")
    setDataUser({ ...dataUser, loading: true })
    deleteTrabajador(idUsuario).then((response) => {
      console.log(response.status);
      if (response?.status === 200) {
        refreshData();
      }
    }).catch(error => {
      setDataUser({ ...dataUser, loading: false })
    });
  }
  const asyncFilter = async (arr, predicate) =>
    arr.reduce(async (memo, e) =>
      [...await memo, ...await predicate(e) ? [e] : []]
      , []);


  const filterUsuarios = async () => {

    console.log("=>>filterUsuarios", inputSearchValue)
    if (inputSearchValue !== null) {
      setDataUser({ ...dataUser, loading: true })
      let dataResult = await asyncFilter(usuarios, dataFilters);
      console.log("=>>filterUsuarios", dataResult)
      setDataUser({ data: dataResult, loading: false })
    }


  }

  const headerUsuarios = [
    {
      id: '_id',
      disablePadding: false,
      label: 'Acciones',
      type: "acciones",
      acciones: [
        {
          type: "view",
          function: (id) => { console.log(id); navigate(`./${id._id}`) }
        },
        {
          type: "delete",
          function: (id) => {

            console.log("delete", id)
          }
        },
      ]
    },
    {
      id: 'avatar',
      disablePadding: false,
      label: 'Foto',
      type: "avatar"
    },
    {
      id: 'rut',
      disablePadding: false,
      label: 'Rut',
      type: "string"
    },
    {
      id: 'nombres',
      disablePadding: false,
      label: 'Nombre',
      type: "string"
    },
    {
      id: 'apellidoPaterno',
      disablePadding: false,
      label: 'Apellido Paterno',
      type: "string"
    },
    {
      id: 'apellidoMaterno',
      disablePadding: false,
      label: 'Apellido Materno',
      type: "string"
    },
    {
      id: 'correo',
      disablePadding: false,
      label: 'e-mail',
      type: "email"
    },
    {
      id: 'telefono',
      disablePadding: false,
      label: 'Teléfono',
      type: "string"
    },
    {
      id: 'ciudadResidencia',
      disablePadding: false,
      label: 'Residencia',
      type: "string"
    },
    {
      id: 'profesionEspecialidad',
      disablePadding: false,
      label: 'Profesión/Ocupación',
      type: "string"
    },
    {
      id: 'isActivo',
      disablePadding: false,
      label: 'Profesional Activo',
      type: "bool"
    },

  ];

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid item md={12}>
          <CustomInput placeholder="Ingresa RUT o nombre del usuario que buscas"
            inputSearchValue={inputSearchValue}
            setInputSearchValue={setInputSearchValue} />
        </Grid>
        <Grid item md={12}>
          <Divider variant="fullWidth" component={'div'} />
          {/* <CustomDivider /> */}
        </Grid>
        <Grid item md={12}>
          {
            dataUser.loading ?
              <Loading /> : <CustomMaterialTable
                handleEliminar={handleEliminar}
                headerData={headerUsuarios}
                data={dataUser.data}
                numFila={20}
              />
          }

        </Grid>



      </Grid >
    </>
  );
}