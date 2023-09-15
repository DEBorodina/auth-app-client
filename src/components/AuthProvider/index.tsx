import React, { ReactNode, useEffect, useState } from "react";
import { UserService } from "../../sevices/UserService";
import { IUser } from "../../types";
import { cryptoService } from "../../sevices/CryptoService";
import { Loader } from "../Loader";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../contexts/user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean>(
    Boolean(localStorage.getItem("key") && localStorage.getItem("sessionId"))
  );
  const [connecting, setIsConnecting] = useState(true);

  const fetchUserData = async () => {
    try {
      if (!user) {
        const userData = await UserService.getUser();
        setUser(userData);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const establishConnection = async () => {
    await cryptoService.fetchPrivateKey();
    setIsConnecting(false);
    setIsConnected(true);
    fetchUserData();
  };

  useEffect(() => {
    if (!isConnected && connecting) {
      establishConnection();
    } else {
      setIsConnecting(false);
      fetchUserData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {isLoading || connecting ? <Loader /> : children}
      </BrowserRouter>
    </UserContext.Provider>
  );
};
