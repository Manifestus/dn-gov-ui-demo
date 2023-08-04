import { useContext } from "react";
import type { AuthContextType as Auth0AuthContextType } from "src/contexts/auth/auth0-context";
import { AuthContext } from "../contexts/auth/auth0-context";

type AuthContextType = Auth0AuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
