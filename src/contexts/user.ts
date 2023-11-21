import { Dispatch, SetStateAction, createContext } from "react";
import { IUserData } from "../types";

export const UserContext = createContext<{
  userData: IUserData | null;
  setUserData: Dispatch<SetStateAction<IUserData | null>>;
} | null>(null);
