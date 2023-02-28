import { Card, CardContent, Grid } from "@mui/material";
import FormularioCrearUsuario from "../Usuarios/component/FormularioCrearUsuario";

import './IngresarPage.scss';

export default function PublicAddUser() {



  return (
    <main className="login-main">
      <div className="container">
        <div className="row vh-100 d-flex align-items-center">
          <div className="col-12">
            <Card >
              <CardContent>
                <Grid s>
                  <FormularioCrearUsuario setOpenModal={true} />
                </Grid>
              </CardContent>


            </Card>

          </div>
        </div>
      </div>
    </main>
  );
}