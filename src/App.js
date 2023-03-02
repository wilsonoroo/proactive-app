import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CargosPage from "./pages/Cargos/CargosPage";
import Error404Page from "./pages/Error404Page/Error404Page";
import FaenasPage from "./pages/Faenas/FaenasPage";
import Login from "./pages/Ingresar/IngresarPage";
import LicenciaConducirPage from "./pages/LicenciaConducir/LicenciaConducirPage";
import PublicAddUser from "./pages/publicAddUser/PublicAddUser";
import ReclutamientoPage from "./pages/Reclutamientos/Reclutamiento/ReclutamientoPage";
import ReclutamientosPage from "./pages/Reclutamientos/ReclutamientosPage";
import RequisitosPage from "./pages/Requisitos/RequisitosPage";
import UsuarioPage from "./pages/Usuarios/Usuario/UsuarioPage";
import UsuarioPagePorProyecto from "./pages/Usuarios/Usuario/UsuarioPagePorProyecto";
import UsuariosPage from "./pages/Usuarios/UsuariosPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<PublicRoute componente={Login} />} />
        <Route path="primerIngreso" element={<PublicRoute componente={PublicAddUser} />} />
        <Route path="requisitos" element={<PrivateRoute permisos={["vendedor"]} componente={RequisitosPage} />} />
        <Route path="licencia-conducir" element={<PrivateRoute permisos={["vendedor"]} componente={LicenciaConducirPage} />} />
        <Route path="faenas" element={<PrivateRoute permisos={["vendedor"]} componente={FaenasPage} />} />
        <Route path="reclutamientos" element={<PrivateRoute permisos={["vendedor"]} componente={ReclutamientosPage} />} />
        <Route path="reclutamientos/:id" element={<PrivateRoute permisos={["vendedor"]} componente={ReclutamientoPage} />} />
        <Route path="usuarios" element={<PrivateRoute permisos={["vendedor"]} componente={UsuariosPage} />} />
        <Route path="usuarios/:id" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPage} />} />
        <Route path="usuarios/:id/:idFaena" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPagePorProyecto} />} />
        <Route path="cargos" element={<PrivateRoute permisos={["vendedor"]} componente={CargosPage} />} />
        <Route path="cargos/:id" element={<PrivateRoute permisos={["vendedor"]} componente={CargosPage} />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}