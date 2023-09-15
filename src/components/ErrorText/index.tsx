import { SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

export const ErrorText: React.FC<{
  children: ReactNode;
  sx?: SxProps<Theme>;
}> = ({ children, sx }) => {
  return (
    <Typography
      paragraph
      sx={{ width: "100%", height: 22, color: "red", ...sx }}
      variant="caption"
    >
      {children}
    </Typography>
  );
};
