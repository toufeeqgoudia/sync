import { useState, useEffect, createContext, ReactNode } from "react";
import { instance } from "../Utils/apiServices";

interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  colour: string;
}

export interface AuthContextProps {
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({ user: null });

export default AuthContext;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await instance.get("/auth/user/", {
          headers: { Authorization: `Token ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.log("Error fetching User", error);
      }

      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
