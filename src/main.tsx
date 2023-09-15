import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";
import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
