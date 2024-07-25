import { Api_options } from '../Utilis/Constant'
import { useDispatch, useSelector} from 'react-redux'
import { addPopularMovies } from '../Utilis/MoviesSlice'
import { useEffect } from 'react';

const usePopularMovies = () =>{
    const dispatch = useDispatch();

    const PopularMovies = useSelector((store) => store.movies.PopularMovies);
   
    const getPopularMovies  = async () =>{
      const data = await fetch
      ("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", Api_options);
  
      const json = await data.json();
      console.log(json.results);

      dispatch(addPopularMovies(json.results));
    
    }
  
    useEffect(() =>{
        !PopularMovies &&  getPopularMovies();
    },[])  
};

export default usePopularMovies;


