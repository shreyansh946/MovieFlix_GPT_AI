import React, { useEffect } from 'react';
import { Api_options } from '../Utilis/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../Utilis/MoviesSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);


    const getTopRatedMovies = async() =>
        {
            const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',  Api_options ) 
            const json = await data.json();

            dispatch(addTopRatedMovies(json.results));
        }   

        useEffect(() => {
            //Memoization - If there's no 'Top Rated Movies' exists, make a call & fetch movies
            !topRatedMovies && getTopRatedMovies();
          }, [])
}

export default useTopRatedMovies;