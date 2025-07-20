import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./store/store.js";

import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Home,
//     children: [{ path: "", Component: Home }],
//   },
// ]);

createRoot(document.getElementById("root")).render(
  
    
      <Provider store={store}>

      <App />
      </Provider>
   

);
