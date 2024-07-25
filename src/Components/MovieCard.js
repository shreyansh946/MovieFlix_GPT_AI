import React, { useState } from 'react'
import { IMG_CDN } from '../Utilis/Constant'
import CircularRatingBar from './CircularRatingBar';


const MovieCard = ({title, movieId, date, rating, vote, posterPath, genre}) => {

  const [isHovered,setIsHovered] = useState(false);

  if(!posterPath) return null;
    
  return (
    <div className={`transition hover:-translate-y-1 relative w-36 md:w-48 pr-4 hover:z-10 ${isHovered ? 'visible'  : ''}`} 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>

      <img alt="Movie Card" src={IMG_CDN + posterPath} />

      <div className="relative bottom-4 md:left-16 md:bottom-8 w-8 md:w-14 rounded-full z-20 bg-gray-700">
      <CircularRatingBar rating={rating}/>
        </div>
     </div>
     
  )
}

export default MovieCard