import { Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainContainer from "../../layouts/MainContainer";
import AgregarDocsUsuarioFromFile from "./component/AgregarDocsUsuarioFromFile";
import AgregarUsuario from "./component/AgregarUsuario";
import AgregarUsuarioFromFile from "./component/AgregarUsuarioFromFile";
import TablaUsuarios from "./component/TablaUsuarios";
import { getUtils } from "../../services/database/empresaServices";
import { getUsuarioByUid, getUsuarios, getUsuariosArray } from "../../services/database/usuariosServices";

export default function UsuariosPage() {
  // titulo para el container y el html
  const tituloPage = "Usuarios";
  const empresa = "shingeki_no_sushi";
  const [listaUsuarios, setListaUsuario] = useState([])
  // custom hook para realizar peticion
  const { data: usuarios, firstLoading, refreshData, isLoading } = useFetch(() => getUsuariosArray(empresa));

  useEffect(() => {
    console.log(usuarios.length, firstLoading)
    setListaUsuario(usuarios)
  }, [usuarios])
  console.log("AAAAAAAA", listaUsuarios)

  // getUsuariosArray(empresa).then((value) => console.log(value) );


  const [utils, setUtils] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const utilsData = await getUtils(empresa); // Llamamos a la función getUtils
      if (utilsData) {
        setUtils(utilsData); // Si hay datos, los guardamos en el estado
      }
    };
    fetchData();
  }, [empresa]);

  // console.log(utils)



  return (
    <MainContainer titulo={tituloPage}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item container maxWidth={true} >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h3" gutterBottom>
                {tituloPage}
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
              >

                {/* <Link to="/formato-user.xlsx" target="_blank" download>Descargar de formato</Link> */}
                <Grid item>
                  <AgregarUsuario utils={utils} />
                </Grid>
                <Grid item>
                  {/* <AgregarUsuarioFromFile refreshData={refreshData} /> */}
                </Grid>
                <Grid item>
                  {/* <AgregarDocsUsuarioFromFile refreshData={refreshData} /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item md={12}>
            <Divider component={'div'} variant="fullWidth" />
          </Grid>

        </Grid>
        <Grid item container direction="column">
          {
            <TablaUsuarios usuarios={listaUsuarios} refreshData={refreshData} loadingData={isLoading} />
          }
        </Grid>

      </Grid>
    </MainContainer>
  );
}