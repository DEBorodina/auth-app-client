import { Dispatch, SetStateAction, createContext } from "react";
import { IUser } from "../types";

export const UserContext = createContext<{
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
} | null>(null);
