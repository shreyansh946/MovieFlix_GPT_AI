import React, { useEffect } from 'react';
import Header from './Header';
import useplayingMovies from '../Hooks/usePlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../Hooks/usePopularMovies';
import GptSearch from './GptSearch';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGptSearchView } from '../Utilis/gptSlice';
import { addPath } from '../Utilis/PathSlice';
import useTopRatedMovies from'../Hooks/useTopRatedMovies';
import useUpComingMovies from '../Hooks/useUpComingMovies';

const Browse = () => {

  const user = useSelector((store)=> store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useplayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  useEffect(() => {
    dispatch(toggleGptSearchView());
    dispatch(addPath(pathname));
  }, [])


  return (
    <div>
      <Header />
      {
        showGptSearch ? (<><GptSearch /></> )
          :
          (
            <>
              <MainContainer />
              <SecondaryContainer />

            </>)
      }
    </div>
  );
};

export default Browse;
