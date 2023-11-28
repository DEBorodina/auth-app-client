import { Dispatch, SetStateAction, createContext } from "react";
import { IUser } from "../types";

export const UserContext = createContext<{
  userData: IUser | null;
  setUserData: Dispatch<SetStateAction<IUser | null>>;
} | null>(null);
