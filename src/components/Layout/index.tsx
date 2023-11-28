import { Breakpoint, Container, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export const Layout: React.FC<{
  children: ReactNode;
  sx?: SxProps<Theme>;
  maxWidth?: Breakpoint;
}> = ({ children, sx, maxWidth = "xs" }) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        mt: 4,
        minHeight: 300,
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};
