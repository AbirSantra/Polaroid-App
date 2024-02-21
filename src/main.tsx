import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import QueryProvider from "./lib/tanstack-query/QueryProvider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { Modals } from "./components/modals.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <ModalProvider>
          <Modals />
          <App />
        </ModalProvider>
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
