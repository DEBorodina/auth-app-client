import { Container, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export const Layout: React.FC<{ children: ReactNode; sx?: SxProps<Theme> }> = ({
  children,
  sx,
}) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        mt: 10,
        minHeight: 300,
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};
