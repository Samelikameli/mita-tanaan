import { createContext } from "react";
import { FirebaseApp } from "firebase/app";

const AppContext = createContext<FirebaseApp>();
export default AppContext;
