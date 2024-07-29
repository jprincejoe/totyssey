// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { BrowserRouter as Router } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "./config/queryClient.ts";
// import AppRoutes from "./AppRoutes.tsx";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useStore } from "./stores/store.ts";
// import { useUser } from "./features/user/hooks/useUser.ts";

// const App = () => {
//   const setUser = useStore((state) => state.setUser);

//   const { data: user } = useUser();

//   useEffect(() => {
//     if (user !== undefined) {
//       setUser(user);
//     }
//   }, [setUser]);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <AppRoutes />
//         <ToastContainer />
//         <ReactQueryDevtools position="bottom" initialIsOpen={false} />
//       </Router>
//     </QueryClientProvider>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
        <ToastContainer />
        <ReactQueryDevtools position="bottom" initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
