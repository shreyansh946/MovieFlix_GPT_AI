import { useDispatch, useSelector } from "react-redux";
import { Api_options } from "../Utilis/Constant";
import { addTrailerVideo } from "../Utilis/MoviesSlice";
import { useEffect } from "react";

const useTrailer = (movieId) => {

    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo);

    const getMovieVideo = async () => {
        const data = await
            fetch(
                "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
                Api_options);

        const json = await data.json();
        console.log(json);

        if (json.results && Array.isArray(json.results)){

            const FilterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = FilterData.length ? FilterData[0] : json.results[0];
       
        dispatch(addTrailerVideo(trailer));
        }

    };

    useEffect(() => {
   getMovieVideo();
    },[movieId])
}

export default useTrailer