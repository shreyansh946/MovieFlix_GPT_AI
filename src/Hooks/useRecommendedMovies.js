import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRecommendedMovies} from "../Utilis/MoviesSlice";
import { Api_options } from "../Utilis/Constant";

const useRecommendedMovies = ({movieId}) => {
    const dispatch = useDispatch();

    const getRecommendedMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/ " + movieId + "/recommendations?language=en-US&page=1",
      Api_options);

        const json = await data.json();
        dispatch(addRecommendedMovies(json.results));
    }

    useEffect(() => {
        getRecommendedMovies();
        window.scrollTo(0, 0);
    }, [movieId])
}

export default useRecommendedMovies;