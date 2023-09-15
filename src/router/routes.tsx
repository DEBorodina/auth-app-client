import { ROUTE_NAMES } from "../constants/routeNames";

import { LogInPage } from "../pages/LogInPage";
import { ProfilePage } from "../pages/ProfilePage";
import { SignUpPage } from "../pages/SignUpPage";

const { SIGN_UP, LOGIN, PROFILE } = ROUTE_NAMES;

export const publicRoutes = [
  {
    path: SIGN_UP,
    component: <SignUpPage />,
  },
  {
    path: LOGIN,
    component: <LogInPage />,
  },
];

export const privateRoutes = [
  {
    path: PROFILE,
    component: <ProfilePage />,
  },
];
