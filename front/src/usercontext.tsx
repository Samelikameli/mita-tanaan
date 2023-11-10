import { createContext } from "react";
import { User } from "./controllers/user.tsx";

const UserContext = createContext<User | null>(null);

export default UserContext;
