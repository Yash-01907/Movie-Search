
import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./store/store.js";

import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import MovieSuggestion from "./components/MovieSuggestion.jsx";
import MovieDetailPage from "./components/MovieDetailPage.jsx";
import { searchById } from "./api/tmdb.js";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Favorites from "./components/Favorites.jsx";
import WatchList from "./components/WatchList.jsx";

async function movieDataLoader({params}){
      const movieId=params.movieId
      const data = await searchById(movieId)
      return data
}

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
    children: [
      { path: "/", element: <MovieSuggestion /> },
      { path: "movie/:movieId", element: <MovieDetailPage /> ,loader:movieDataLoader},
      {path:'login',element:<Login/>},
      {path:'signup',element:<SignUp/>},
      {path:'favorites',element:<Favorites/>},
      {path:'watchlist',element:<WatchList/>}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
