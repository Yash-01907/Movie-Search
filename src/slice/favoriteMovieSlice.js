import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteMovies: [],
};

const favoriteMovieSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = favoriteMovieSlice.actions;

export default favoriteMovieSlice.reducer;
