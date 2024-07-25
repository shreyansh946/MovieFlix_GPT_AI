import React, { useRef } from 'react';
import lang from "../Utilis/LanguageConst";
import openai from '../Utilis/OpenAi';
import { Api_options } from '../Utilis/Constant';
import { addGptMovieResult } from '../Utilis/gptSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorHandling from './ErrorHandling';


const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch()
  const SearchText = useRef(null);
  const gptMoviesList = useSelector((store) => store.gpt.movieResults);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="
      + movie +
      "&include_adult=false&language=en-US&page=1", Api_options
    );
    const json = await data.json();
    return json.results;
  }


  const handleGptSearchClick = async () => {
    console.log(SearchText.current.value);

    const gptQuery = "Act as a Movie recommnedation system and suggestion some movies for the query" + SearchText.current.value +
      ". only give me name of 5 movies, comma seperation like the example result given ahead. example sholya, gaddar etc";

    const gptresults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if (!gptresults.choices) {
      <ErrorHandling />
    }

    //  console.log(gptresults.choices?.[0]?.message.content);

    const gptMovies = gptresults.choices?.[0]?.message?.content.split(",");


    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({ moviename: gptMovies, movieResults: tmdbResults }));
  }

  return (
    <>
      <div className="pt-[35%] md:pt-[10%] flex justify-center">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={SearchText}
            type="text"
            className="p-1 text-xs md:text-base md:p-3 m-4 col-span-8 md:col-span-9"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button className="col-span-3 m-4 py-2 px-1 text-xs md:text-base ml-0 bg-red-700 text-white rounded-lg"
            onClick={handleGptSearchClick} >
            {lang[langKey].search}</button>
        </form>
      </div>

      {gptMoviesList === null && (
        <div className="w-[200px] h-[330px] md:w-[300px] mt-20 py-24 md:py-10 relative top-28 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          {/* when no movies are fetch */}
        </div>
      )}

    </>
  )
}

export default GptSearchBar