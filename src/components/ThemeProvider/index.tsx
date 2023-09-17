import React, { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { COLORS } from "../../constants/color";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
  },
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
