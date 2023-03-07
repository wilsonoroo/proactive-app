import { createContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { loginUsuarioVaku } from "../services/authAPI";
import { auth } from "../services/config";
import { clearAccessToken, setAccessToken } from "../services/token";
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
    console.log(response);
    if (response?.status === 200) {
      setAccessToken(response.token as string);
      setUser(response.user);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  const logout = () => {
    setUser(null);
    clearAccessToken();
  };

  useEffect(() => {
    console.log("change user", user);
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

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
