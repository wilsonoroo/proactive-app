import { useState } from "react";
import * as Icons from 'react-feather';
import LogoProactive from '../../assets/logo.png';
import CustomButton from "../../components/CustomButton/CustomButton";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import './LoginPage.scss';

export default function Login() {

  const { login } = useAuth();

  const [showLoginForm, setShowLoginForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  function handleShowLoginForm() {
    setShowLoginForm(!showLoginForm);
  }

  const handleSubmit = async (e) => {
    setIsError(false);
    e.preventDefault();
    setIsLoading(true);
    const response = await login(email, password);
    setIsLoading(false);
    if (response) {
      console.log("CREDENCIALES CORRECTAS");
    } else {
      console.log("CREDENCIALES INCORRECTAS");
      setIsError(true);
    }
  }

  const initialInputValues = {
    email: "",
    password: ""
  };

  const { inputValues, handleInputChanges } = useForm(initialInputValues);

  const { email, password } = inputValues;

  return (
    <main className="login-main">
      <div className="container">
        <div className="row vh-100 d-flex align-items-center">
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                {/* <img src={"./assets/logo-proactive.png"} alt="logo-proactive" style={{ maxWidth: "500px" }} /> */}
                <img src={LogoProactive} alt="logo-proactive" style={{ maxWidth: "500px" }} />
              </div>
              <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center mt-5 mt-lg-0">
                {
                  showLoginForm ?
                    <div className="boton-iniciar" onClick={handleShowLoginForm}>Iniciar</div>
                    :
                    <form className="form-container p-4" onSubmit={handleSubmit}>
                      <div className="d-flex justify-content-center my-2">
                        <div className="boton-cerrar-ingresar" onClick={handleShowLoginForm}><Icons.X /></div>
                      </div>
                      <div className="form-titulo d-flex">
                        <div className="d-flex titulo-left p-2">
                          <Icons.User className="me-1" /> Perfil
                        </div>
                        <div className="titulo-right p-2">
                          Reclutamiento
                        </div>
                      </div>
                      <div className="d-flex justify-content-between my-2">
                        <label>Nombre</label>
                        <input
                          className="input-ingresar"
                          id="email"
                          name="email"
                          type="text"
                          value={email}
                          onChange={handleInputChanges}
                        />
                      </div>
                      <div className="d-flex justify-content-between my-2">
                        <label>Contraseña</label>
                        <input
                          className="input-ingresar"
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={handleInputChanges}
                        />
                      </div>
                      {isError && <span className="text-danger">Las credenciales ingresadas son incorrectas.</span>}
                      <div className="d-flex justify-content-end my-2">
                        <CustomButton typeColor="primary" isLoading={isLoading} type={"submit"} >Ingresar</CustomButton>
                      </div>
                      <div className="texto-powered mt-4">Software Reclutamiento Proactive powered by AKROM</div>
                    </form>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}