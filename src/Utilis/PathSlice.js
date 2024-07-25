import { createSlice } from "@reduxjs/toolkit";

const PathSlice = createSlice({
    name:"path",
    initialState:{
        path:null,
    },
    reducers:{
        addPath :(state,action) =>{
            state.path = action.payload;
        },
    },
});

export const {addPath} = PathSlice.actions;
export default PathSlice.reducer;