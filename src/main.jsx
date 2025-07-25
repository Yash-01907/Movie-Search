import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./store/store.js";

import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
} from "react-router";
import { Provider } from "react-redux";
import MovieSuggestion from "./components/MovieSuggestion.jsx";
import MovieDetailPage from "./components/MovieDetailPage.jsx";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Home,
//     children: [{ path: "", Component: Home }],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <MovieSuggestion /> },{path:"movie/:movieId",element:<MovieDetailPage/>}],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
