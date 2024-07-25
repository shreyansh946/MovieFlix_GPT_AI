import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { backgournd_img } from '../Utilis/Constant'
import { useDispatch } from 'react-redux'
import { addPath } from '../Utilis/PathSlice'

const GptSearch = () => {

  const dispatch = useDispatch();
  dispatch(addPath(window.location.pathname));

  return (
    <div>
         <div className='fixed -z-10'>
            <img  className="h-screen object-cover md:w-screen"src={backgournd_img}
             alt='netflix-backgrounf-img' />
        </div>
       
       <div className="pt-[30%] md:p-0">
       <GptSearchBar />
       <GptMovieSuggestion/>
       </div>
    </div>
  )
}

export default GptSearch