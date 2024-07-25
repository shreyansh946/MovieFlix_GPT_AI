import React, { useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { addPath } from '../Utilis/PathSlice';
import MovieCard from './MovieCard';
import { removeFavouriteMovie } from "../Utilis/MoviesSlice";
import { ToastContainer } from 'react-toastify';

const Favourite = () => {

    const Favourites = useSelector((store) => store?.movies?.Favourites);
    const dispatch = useDispatch();
    const pathname = window.location.pathname;

    useEffect(() => {
        dispatch(addPath(pathname));
    }, [])

    return (
        <div className="w-full min-h-screen pt-[150px] px-5 md:pt-[120px] md:pb-5 md:px-10 text-white graybackgroundColor">
            <h2 className="text-3xl font-bold text-white" >Favourites</h2>
            {Favourites == null || Favourites?.length === 0 ? (
                <div className="w-[200px] md:w-[300px] pt-32 md:pt-44 md:py-20 relative top-60 md:top-48 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <img src="" alt="no-watchlist" />
                    <p className="text-center text-2xl font-bold text-white">
                        No Favourite Movies
                    </p>
                </div>
            ) : (<div className="grid grid-cols-2 md:grid-cols-6 pl-2 mx-auto" >
                {Favourites?.map((movie) => (
                    <div key={movie?.id}>
                        <button onClick={() => {
                            dispatch(removeFavouriteMovie(movie?.id));
                        }}

                        >
                            <MdCancel size={32} />
                        </button>
                        <Link to={`/movie/${movie?.id}`}>
                            <div>
                                <MovieCard
                                    title={movie?.title}
                                    movieId={movie?.id}
                                    date={movie?.release_date}
                                    rating={movie?.vote_average?.toFixed(1)}
                                    vote={movie?.vote_count}
                                    posterPath={movie.poster_path}
                                    textColor={'text-white'}
                                    genre={movie?.genre}
                                    movie={movie} />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>)}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    );
};

export default Favourite;
