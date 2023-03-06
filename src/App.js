import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/Auth";
import CargosPage from "./pages/Cargos/CargosPage";
import Error404Page from "./pages/Error404Page/Error404Page";
import FaenasPage from "./pages/Faenas/FaenasPage";
import IngresarPage from "./pages/Ingresar/IngresarPage";
import LicenciaConducirPage from "./pages/LicenciaConducir/LicenciaConducirPage";
import PublicAddUser from "./pages/publicAddUser/PublicAddUser";
import ReclutamientoPage from "./pages/Reclutamientos/Reclutamiento/ReclutamientoPage";
import ReclutamientosPage from "./pages/Reclutamientos/ReclutamientosPage";
import VehiculosPage from "./pages/Vehiculos/VehiculosPage";
import UsuarioPage from "./pages/Usuarios/Usuario/UsuarioPage";
import UsuarioPagePorProyecto from "./pages/Usuarios/Usuario/UsuarioPagePorProyecto";
import UsuariosPage from "./pages/Usuarios/UsuariosPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";


export default function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/ingresar" />} />
          <Route path="ingresar" element={<PublicRoute componente={IngresarPage} />} />
          <Route path="primerIngreso" element={<PublicRoute componente={PublicAddUser} />} />
          <Route path="vehiculos" element={<PublicRoute permisos={["vendedor"]} componente={VehiculosPage} />} />
          <Route path="licencia-conducir" element={<PrivateRoute permisos={["vendedor"]} componente={LicenciaConducirPage} />} />
          <Route path="faenas" element={<PublicRoute permisos={["vendedor"]} componente={FaenasPage} />} />
          <Route path="reclutamientos" element={<PrivateRoute permisos={["vendedor"]} componente={ReclutamientosPage} />} />
          <Route path="reclutamientos/:id" element={<PrivateRoute permisos={["vendedor"]} componente={ReclutamientoPage} />} />
          <Route path="usuarios" element={<PublicRoute permisos={["vendedor"]} componente={UsuariosPage} />} />
          <Route path="usuarios/:id" element={<PublicRoute permisos={["vendedor"]} componente={UsuarioPage} />} />
          <Route path="usuarios/:id/:idFaena" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPagePorProyecto} />} />
          <Route path="cargos" element={<PublicRoute permisos={["vendedor"]} componente={CargosPage} />} />
          <Route path="cargos/:id" element={<PrivateRoute permisos={["vendedor"]} componente={CargosPage} />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
    </BrowserRouter>
  );
}