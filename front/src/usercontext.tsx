import { createContext, useContext } from "react";
import { User } from "./controllers/user.tsx";

const UserContext = createContext<User | null>(null);

const useUser = () => {
    return useContext(UserContext);
};

export { useUser };
export default UserContext;
