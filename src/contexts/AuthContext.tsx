import { createContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { loginUsuarioVaku, reIngresarUsuarioApi } from "../services/authAPI";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../services/token";
interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

interface ContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<ContextValue>(null);

interface props {
  children: JSX.Element;
}

export default function AuthProvider({ children }: props) {
  const [user, setUser] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function login(email: string, password: string): Promise<boolean> {
    const response = await loginUsuarioVaku(email, password);
    if (response?.status === 200) {
      console.log(response);
      setAccessToken(response.token as string);
      setUser(response.user);
      return true;
    } else {
      return false;
    }
  }

  const logout = () => {
    setUser(null);
    clearAccessToken();
  };

  const reLogin = () => {
    setTimeout(async () => {
      const response = await reIngresarUsuarioApi();
      if (response.status === 200) {
        const { user, token } = await response.json();
        setUser(user);
      } else {
        clearAccessToken();
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (getAccessToken()) {
      reLogin();
    } else {
      setIsLoading(false);
    }
  }, []);

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading ? (
        <div className="d-flex vh-100 align-items-center">
          <Loading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
