import React from 'react';
import { useSelector } from "react-redux";
import VTitle from "./VTitle";
import VBG from "./VBG";


const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[0];


  const { original_title, overview,id } = mainMovie;

  return (
    <div  className="pt-[30%] bg-black md:pt-0">
      <VTitle movieId={id}  title={original_title} overview={overview} />
      <VBG movieId ={id} widthScreen={"w-screen"}/>
    </div>
  );
};
export default MainContainer;