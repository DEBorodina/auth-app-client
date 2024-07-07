import { IconButton, TextField } from "@mui/material";
import { Message } from "../Message";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/user";
import SendIcon from "@mui/icons-material/Send";
import { IMessage } from "../../types";
import { cryptoService } from "../../sevices/CryptoService";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => elementRef?.current?.scrollIntoView());

  return <div ref={elementRef} />;
};

export const Chat = () => {
  const { userData } = useContext(UserContext)!;
  const [value, setValue] = useState("");
  const [ws, setWs] = useState<WebSocket>();
  const [messages, setMessages] = useState<IMessage[] | undefined>(
    userData?.messages && JSON.parse(userData?.messages)
  );

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (value && ws) {
      ws.send(
        JSON.stringify({
          data: cryptoService.encryptData({
            authorName: userData?.user?.name,
            authorLastName: userData?.user?.lastName,
            authorId: userData?.user?.id,
            text: value,
          }),
          sessionId: localStorage.getItem("sessionId"),
        })
      );
      setValue("");
    }
  };

  const openWebSocket = () => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL ?? "");
    ws.onopen = () => {
      setWs(ws);
      ws.send(
        JSON.stringify({
          sessionId: localStorage.getItem("sessionId"),
        })
      );
      ws.addEventListener("message", function incoming(event) {
        const data = cryptoService.decryptData(event.data);
        setMessages(data);
      });
    };
  };

  useEffect(() => {
    openWebSocket();
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
        {messages &&
          messages.map((message) => <Message key={message.id} {...message} />)}
        <AlwaysScrollToBottom />
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
