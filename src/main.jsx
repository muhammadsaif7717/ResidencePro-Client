import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import router from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Contexts/AuthProvider";
import { ThemeProvider } from "./Hooks/useTheme";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
        <HelmetProvider>
          <div className=" mx-auto ">
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
</ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
