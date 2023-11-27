import { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";

interface User {
  id: string;
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
        const response = await axios.get("http://127.0.0.1:8000/auth/user/", {
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
