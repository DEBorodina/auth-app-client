import { SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

export const InfoText: React.FC<{
  children: ReactNode;
  sx?: SxProps<Theme>;
  color?: string;
}> = ({ children, sx, color }) => {
  return (
    <Typography
      paragraph
      sx={{ textAlign: "center", ...sx }}
      variant="body1"
      color={color}
    >
      {children}
    </Typography>
  );
};
