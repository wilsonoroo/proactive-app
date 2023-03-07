import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { deleteTrabajador } from "../../../api/usuariosAPI";
import PropTypes from 'prop-types';
import CustomInput from "../../../components/CustomInputs/CustomInput";
import CustomMaterialTable from "../../../components/CustomMaterialTable/CustomMaterialTable";
import Loading from "../../../components/Loading";
import { deleteTrabajador } from "../../../services/database/usuariosServices";



export default function TablaUsuarios({ usuarios, refreshData, loadingData }) {
  const navigate = useNavigate();
  // const empresa = "shingeki_no_sushi";
  const [inputSearchValue, setInputSearchValue] = useState(null);
  const [dataUser, setDataUser] = useState({ data: [], loading: false });
  // const [debouncedTerm, setDebouncedTerm] = useState(inputSearchValue);
  useEffect(() => {
    setDataUser({ data: usuarios, loading: loadingData })
  }, [usuarios])

  // useEffect(() => {
  //   console.log("=>>usuarios", { ...dataUser, data: usuarios }, usuarios.length)
  //   setDataUser({ ...dataUser, data: usuarios })
  // }, [usuarios])

  // useEffect(() => {
  //   console.log("=>>loading", { ...dataUser, loading: usuarios }, usuarios.length)
  //   setDataUser({ ...dataUser, loading: loadingData })
  // }, [loadingData])
  // console.log(dataUser, usuarios.length)

  useEffect(() => {
    // console.log(inputSearchValue)
    const timer = setTimeout(() => filterUsuarios(), 1000);
    return () => clearTimeout(timer);
  }, [inputSearchValue])


  const dataFilters = (e) => {
    if (inputSearchValue.length !== 0) {

      if (e.displayName || e.email || e.rut) {
        if (e.rut.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.displayName.toLowerCase().includes(inputSearchValue.toLowerCase()) ||
          e.email.toLowerCase().includes(inputSearchValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    }
    return true
  }


  const handleEliminar = (empresa = "shingeki_no_sushi", uid = "DlnC8ZGgJ4XCCCmPbUqOOPWjtWJ2") => {
    console.log(`Eliminar usuario de la empresa ${empresa} con uid ${uid}`);
    // console.log("=>>handleEliminar");
    setDataUser({ ...dataUser, loading: true });
    deleteTrabajador(empresa, uid).then(() => {
      console.log("Usuario eliminado correctamente");
      refreshData();
    }).catch(error => {
      console.log(error);
      setDataUser({ ...dataUser, loading: false });
    });
  };


  const asyncFilter = async (arr, predicate) =>
    arr.reduce(async (memo, e) =>
      [...await memo, ...await predicate(e) ? [e] : []]
      , []);


  const filterUsuarios = async () => {
    // console.log("=>>filterUsuarios", inputSearchValue)
    if (inputSearchValue !== null) {
      setDataUser({ ...dataUser, loading: true })
      let dataResult = await asyncFilter(usuarios, dataFilters);
      console.log("=>>filterUsuarios", dataResult)
      setDataUser({ data: dataResult, loading: false })
    }
  }

  const headerUsuarios = [
    // {
    //   id: 'avatar',
    //   disablePadding: false,
    //   label: 'Foto',
    //   type: "avatar"
    // },
    {
      id: 'displayName',
      disablePadding: false,
      label: 'Nombre',
      type: "string"
    },
    {
      id: 'rut',
      disablePadding: false,
      label: 'Rut',
      type: "string"
    },
    {
      id: 'email',
      disablePadding: false,
      label: 'e-mail',
      type: "email"
    },
    {
      id: 'cargo',
      disablePadding: false,
      label: 'Cargo',
      type: "string"
    },
    {
      id: 'turno',
      disablePadding: false,
      label: 'Turno',
      type: "string"
    },
    {
      id: 'rol.displayName',
      disablePadding: false,
      label: 'Rol',
      type: "string"
    },
    {
      id: 'id',
      disablePadding: false,
      label: 'Acciones',
      type: "acciones",
      acciones: [
        {
          type: "delete",
          function: (id) => console.log("delete", id)
        },
        {
          type: "view",
          function: (id) => navigate(`./${id.id}`)
        }
      ]
    }
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
        <Grid item md={12} >
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

TablaUsuarios.propTypes = {
  usuarios: PropTypes.array,
  refreshData: PropTypes.func,
  loadingData: PropTypes.bool
};