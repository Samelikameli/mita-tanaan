import { createContext } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";

const AppContext = createContext<FirebaseApp>();
export default AppContext;
