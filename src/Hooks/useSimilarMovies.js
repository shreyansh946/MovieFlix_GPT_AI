import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSimilarMovies } from "../Utilis/MoviesSlice";
import { Api_options } from "../Utilis/Constant";


const useSimilarMovies = ({movieId}) => {
    const dispatch = useDispatch();

    const getSimilarMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/ " + movieId + "/similar?language=en-US&page=1",
        Api_options);

        const json = await data.json();
        dispatch(addSimilarMovies(json.results));
    }

    useEffect(() => {
        getSimilarMovies();
        window.scrollTo(0, 0);
    }, [movieId])
}

export default useSimilarMovies;