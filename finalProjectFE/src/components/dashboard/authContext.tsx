import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface User {
  userId: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string[];
}

type DecodedType = {
  userId: number;
};
interface AuthContextType {
  user: User | null;
  login: (loginData: {
    email: string;
    username?: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getAxios: (token: string | null) => AxiosInstance;
  checkAuthenticated: (token: string | null) => boolean;
  fetchUserInfo: (token: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserInfo(token);
  }, [localStorage.getItem("token")]);

  const login = async (loginData: { email: string; password: string }) => {
    const api = getAxios(null);

    try {
      const response = await api.post("/api/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      localStorage.setItem("token", response.data.token);
      fetchUserInfo(response.data.token);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  //function to get the user's information, and store it in this context

  const fetchUserInfo = async (token: string | null) => {
    if (token != null && checkAuthenticated(token)) {
      const decode = jwtDecode<DecodedType>(token);
      const userId = decode.userId;
      const api = getAxios(token);
      try {
        const response = (
          await api.get(`/api/user/fetchUser`, { withCredentials: true })
        ).data;
        console.log(response);
        setUser({
          userId,
          email: response.email,
          username: response.username,
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNumber: response.Number,
          role: response.roleName,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/home", { replace: true });
    }
  };

  // check the token if its validated
  const checkAuthenticated = (token: string | null): boolean => {
    if (token == null) {
      return false;
    }
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp) {
        if (decoded.exp > currentTime) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Token decoding failed:", error);
      return false;
    }
  };
  // set the axios, if the token is validated
  const getAxios = (token: string | null): AxiosInstance => {
    const api = axios.create({ baseURL: "http://localhost:8080" });
    if (checkAuthenticated(token)) {
      const newApi = api.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
    }
    return api;
  };

  const isAuthenticated = () => {
    return checkAuthenticated(localStorage.getItem("token"));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        getAxios,
        checkAuthenticated,
        fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
