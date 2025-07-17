import { createSlice } from "@reduxjs/toolkit";
import { createElement } from "react";

const initialState={
    movieData:[]
}

const movieDataSlice = createSlice({
    name:"movieData",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.movieData = (action.payload);
        },
        removeData:(state)=>{
            state.movieData = [];
        }
    }
})

export const {addData,removeData} = movieDataSlice.actions

export default movieDataSlice.reducer;