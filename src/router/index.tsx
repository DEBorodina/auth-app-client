import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTE_NAMES } from "../constants/routeNames";

import { privateRoutes, publicRoutes } from "./routes";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

export const Router: React.FC = () => {
  const { SIGN_UP, PROFILE } = ROUTE_NAMES;

  const { userData } = useContext(UserContext)!;
  return (
    <Routes>
      {userData
        ? privateRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))
        : publicRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
      <Route
        path="*"
        element={<Navigate to={userData ? PROFILE : SIGN_UP} replace />}
      />
    </Routes>
  );
};
