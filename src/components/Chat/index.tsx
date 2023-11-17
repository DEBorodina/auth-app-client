import { IconButton, TextField } from "@mui/material";
import { Message } from "../Message";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import SendIcon from "@mui/icons-material/Send";

export const Chat = () => {
  const { user } = useContext(UserContext)!;
  const [value, setValue] = useState("");
  const [ws, setWs] = useState(null);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (value) {
      ws.send(
        JSON.stringify({
          authorName: user?.name,
          authorLastName: user?.lastName,
          text: value,
        })
      );
      setValue("");
    }
  };

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:5001`);
    setWs(ws);
    ws.addEventListener("open", () => {
      console.log("Websocket connection opened");
    });
    ws.addEventListener("close", () => {
      console.log("Websocket connection closed");
    });

    ws.addEventListener("message", function incoming(event) {
      const data = JSON.parse(event.data).map((message) =>
        JSON.parse(Buffer.from(message.data).toString())
      );
      setMessages(data);
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: 400,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderRadius: 18,
        margin: 24,
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflowY: "auto",
        }}
      >
        {messages.map(({ authorLastName, authorName, text }) => (
          <Message
            authorLastName={authorLastName}
            authorName={authorName}
            text={text}
          />
        ))}
      </div>

      <form style={{ display: "flex" }} onSubmit={handleSendMessage}>
        <TextField
          id="standard-basic"
          placeholder="Enter your message"
          variant="standard"
          value={value}
          onChange={handleValueChange}
          multiline
          fullWidth
        />
        <IconButton size="large" type="submit">
          <SendIcon fontSize="inherit" color="primary" />
        </IconButton>
      </form>
    </div>
  );
};
