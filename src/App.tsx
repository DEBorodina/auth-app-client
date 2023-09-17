import { Router } from "./router";
import { AuthProvider } from "./components/AuthProvider";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
