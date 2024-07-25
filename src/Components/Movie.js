import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom"
import useMovieDetails from "../Hooks/useMovieDetails";
import useTrailer from "../Hooks/useTrailer";
import {addPath} from "../Utilis/PathSlice";
import {addMovieClicked} from "../Utilis/MoviePageSlice";
import { useEffect } from "react";
import Shimmer from './Shimmer';
import MovieMainContainer from "./MovieMainContainer";
import MovieSecondaryContainer from "./MovieSecondaryContainer";

const Movie = () =>{
        const {movieId} = useParams();
        const dispatch = useDispatch();

        useMovieDetails({movieId});

        const details = useSelector((store) => store?.movieDetails);
        
        useTrailer({movieId});
        const pathname = window.location.pathname.slice(7);


        useEffect(() => {
            // window.scrollTo(0, 0);
            dispatch(addPath(window.location.pathname.slice(0, 6)));//adding path to redux store
            dispatch(addMovieClicked(pathname));//adding clicked movie path to redux store
          }, [movieId]);


          return details.movieDetails = null ?(
            <Shimmer />
          ) : (
            <div>
                <MovieMainContainer />
                <MovieSecondaryContainer />
            </div>
          );
}

export default Movie;