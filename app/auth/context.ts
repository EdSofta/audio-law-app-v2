import { createContext } from "react";
import { User } from "../models/user.model";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

// const AuthProvider: React.FC<any> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//
//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
