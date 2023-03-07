import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/Auth";
import Error404Page from "./pages/Error404Page/Error404Page";
import FaenasPage from "./pages/Faenas/FaenasPage";
import Login from "./pages/login/LoginPage";
import UsuarioPage from "./pages/Usuarios/Usuario/UsuarioPage";
import UsuariosPage from "./pages/Usuarios/UsuariosPage";
import VehiculosPage from "./pages/Vehiculos/VehiculosPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<PublicRoute componente={Login} />} />
        <Route path="vehiculos" element={<PublicRoute permisos={["vendedor"]} componente={VehiculosPage} />} />
        <Route path="faenas" element={<PublicRoute permisos={["vendedor"]} componente={FaenasPage} />} />
        <Route path="usuarios" element={<PrivateRoute permisos={["vendedor"]} componente={UsuariosPage} />} />
        <Route path="usuarios/:id" element={<PrivateRoute permisos={["vendedor"]} componente={UsuarioPage} />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>

    </BrowserRouter>
  );
}