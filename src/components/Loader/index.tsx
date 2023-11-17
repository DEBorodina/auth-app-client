import { CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};
