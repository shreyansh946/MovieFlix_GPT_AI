import React from 'react'
import { useParams } from 'react-router-dom';
import useMovieCredits from "../Hooks/useMovieCredit";
import useMovieReview from "../Hooks/useMoiveReview";
import useSimilarMovies from "../Hooks/useSimilarMovies";
import useRecommendedMovies from "../Hooks/useRecommendedMovies";
import { useSelector } from 'react-redux';
import MovieCastCard from './MovieCastCard';
import Review from './Review';
import MovieList from './MovieList';

const MovieSecondaryContainer = () => {

    const movieId = useParams();

    useMovieCredits(movieId);
    useMovieReview(movieId);
    useSimilarMovies(movieId);
    useRecommendedMovies(movieId);

  const movieCast = useSelector((store) => store.credits?.cast);
  const movieReviews = useSelector((store) => store.reviews?.review);
  const similarMovies = useSelector((store) => store.movies?.similarMovies);
  const recommendedMovies = useSelector((store) => store.movies?.recommendedMovies);
      

  return (
      <div  className="mt-24 px-3 md:mt-14 md:px-8 md:py-10">
        <h3 className="font-semibold text-2xl text-black">Top Billded Cast</h3>

            <div className="pt-2 flex overflow-x-scroll no-scrollbar scroll-smooth">
              {movieCast?.cast?.map((cast) =>(
                <MovieCastCard
                key = {cast?.id}
                img_path={cast?.profile_path}
                name={cast?.name}
                character={cast?.character} />
              ))}
            </div>

            {movieReviews && movieReviews.length > 0 && (
            <h3 className="font-semibold text-2xl text-black mt-2">
              Reviews
            </h3>
          )}
         <div className="pt-2 flex overflow-x-scroll no-scrollbar scroll-smooth">
            <div>
                {movieReviews?.map((review) => (
                  <Review
                    key={review?.id}
                    id={review?.id}
                    username={review?.author_details?.username}
                    rating={review?.author_details?.rating}
                    date={review?.created_at}
                    content={review?.content}
                  />
                ))}
            </div>
         </div>

         {
           similarMovies && similarMovies.length > 0 && (<div  className="overflow-x-scroll no-scrollbar scroll-smooth">
              {/* <h3 className="font-semibold text-2xl text-black">Similar Movies</h3> */}
              <MovieList
               title={"Similar Movies"}
               movies={similarMovies}
               textColor={"text-black"}
              />
           </div>)
         }

{
           recommendedMovies && recommendedMovies.length > 0 && (<div  className="overflow-x-scroll no-scrollbar scroll-smooth">
              {/* <h3 className="font-semibold text-2xl text-black">Recommended Movies</h3> */}
              <MovieList
               title = {"Recommended Movies"}
               movies={recommendedMovies}
               textColor={"text-black"}
              />
           </div>)
         }
         </div>
  )
}

export default MovieSecondaryContainer