import { configureStore } from "@reduxjs/toolkit";
//import { configure } from "@testing-library/react";
import UserSlice from "./UserSlice";
import MoviesSlice from "./MoviesSlice";
import gptSlice from "./gptSlice";
import ConfigSlice from "./ConfigSlice";
import MoviePageSlice from "./MoviePageSlice";
import PathSlice from "./PathSlice";
import ReviewSlice from "./ReviewSlice";
import CreditSlice from "./CreditSlice";
import MediaSlice from "./MediaSlice";

const AppStore  = configureStore({
    reducer:{
        user:UserSlice,
        movies:MoviesSlice,
        gpt:gptSlice,
        config: ConfigSlice,
        credits: CreditSlice,
        media: MediaSlice,
        movieDetails: MoviePageSlice,
        path:PathSlice,
        reviews: ReviewSlice,
    },
})

export default AppStore;