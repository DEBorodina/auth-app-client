import { Avatar, Typography } from "@mui/material";
import { MessageProps } from "./types";
import { COLORS } from "../../constants/color";

export const Message: React.FC<MessageProps> = ({
  authorName,
  authorLastName,
  text,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        marginBottom: 8,
      }}
    >
      <Avatar sx={{ bgcolor: COLORS.PRIMARY + "aa" }}>
        {authorName[0] + authorLastName[0]}
      </Avatar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          marginLeft: 4,
        }}
      >
        <span
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "white",
            borderRadius: 20,
            borderBottomLeftRadius: 0,
            padding: 12,
            marginBottom: 4,
          }}
        >
          <Typography variant="body2" color="aaaaaa">
            {text}
          </Typography>
        </span>
        <Typography variant="body2" color={COLORS.PRIMARY + "aa"}>
          {authorName} {authorLastName}
        </Typography>
      </div>
    </div>
  );
};
