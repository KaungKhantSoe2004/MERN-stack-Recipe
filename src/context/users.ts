import { createContext } from "react";

interface UserType {
  name: string;
  email: string;
  password: string;
  favorites: string[];
}

interface UserContextType {
  User: UserType;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (emial: string, password: string) => Promise<void>;
  logout: () => string;
}
const AuthContext = createContext<UserContextType | undefined>(undefined);
export default AuthContext;
