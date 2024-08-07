import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.ts";
import AppRoutes from "./AppRoutes.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/UserContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <SearchContextProvider>
            <AppRoutes />
            <ToastContainer />
            <ReactQueryDevtools position="bottom" initialIsOpen={false} />
          </SearchContextProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
