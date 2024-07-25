import { Api_options } from '../Utilis/Constant'
import { useDispatch, useSelector} from 'react-redux'
import { addNowplayingMovies } from '../Utilis/MoviesSlice'
import { useEffect } from 'react';

const usePlayingMovies = () =>{
    const dispatch = useDispatch();

    const nowPlayingMovies =useSelector(store =>store.movies.nowPlayingMovies)
   
    const getNowPlayingMovies  = async () =>{
      const data = await fetch
      ("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", Api_options);
  
      const json = await data.json();
      console.log(json.results);

      dispatch(addNowplayingMovies(json.results));
    
    }
  
    useEffect(() =>{
      !nowPlayingMovies && getNowPlayingMovies();
},[])  
};

export default usePlayingMovies;


