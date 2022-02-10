import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { MessageContextProvider } from "./store/message-context";

ReactDOM.render(
  <AuthContextProvider>
    <MessageContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MessageContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
