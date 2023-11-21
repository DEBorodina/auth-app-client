import { Avatar, Typography } from "@mui/material";
import { COLORS } from "../../constants/color";
import { IMessage } from "../../types";
import { UserContext } from "../../contexts/user";
import { useContext } from "react";

export const Message: React.FC<IMessage> = ({
  authorName,
  authorLastName,
  authorId,
  text,
}) => {
  const { userData } = useContext(UserContext)!;

  const isCurrentUser = userData?.user?.id == authorId;
  const avatarColor = isCurrentUser ? COLORS.PRIMARY : COLORS.BLACK;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        marginBottom: 8,
      }}
    >
      <Avatar sx={{ bgcolor: avatarColor + "aa" }}>
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
