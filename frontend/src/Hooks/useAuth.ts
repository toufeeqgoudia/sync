import { useContext } from "react";
import AuthContext, { AuthContextProps } from "../Context/AuthProvider";

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
