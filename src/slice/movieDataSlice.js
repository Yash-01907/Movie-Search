import { createSlice } from "@reduxjs/toolkit";
import { createElement } from "react";

const initialState={
    movieData:null
}

const movieDataSlice = createSlice({
    name:"movieData",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.movieData = (action.payload);
        },
        removeData:(state)=>{
            state.movieData = null;
        }
    }
})

export const {addData,removeData} = movieDataSlice.actions

export default movieDataSlice.reducer;