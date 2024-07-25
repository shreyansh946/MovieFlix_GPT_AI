import { createSlice } from "@reduxjs/toolkit";

const CreditSlice = createSlice({
    name:"credits",
    initialState:{
        cast:null,
    },
    reducers:{
        addCast :(state,action) =>{
            state.cast = action.payload
        },
    },
});

export default CreditSlice.reducer;

export const {addCast} = CreditSlice.actions;