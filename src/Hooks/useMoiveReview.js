import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Api_options } from "../Utilis/Constant";
import { addReview } from "../Utilis/ReviewSlice";

//movie credits
const useMovieCredits = ({ movieId }) => {
    const dispatch = useDispatch();

    //fetch movie credits
    const getMovieCredits = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" +
            movieId + "/credits?language=en-US", Api_options);

        const json = await data.json();
        dispatch(addReview(json.results));//add movie credits to the redux
    };


    useEffect(() => {
        getMovieCredits();
    }, [movieId])
}

export default useMovieCredits;