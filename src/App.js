import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyle";
import Router from "./shared/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
