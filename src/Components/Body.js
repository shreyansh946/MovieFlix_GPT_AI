import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter,} from 'react-router-dom'
import GptSearch from './GptSearch'
import Movie from './Movie';
import Favourite from "./Favourite";
import WatchList from './WatchList'
import App from "../App";
import Comments from './Comments'

const Body = () => {
   

    const appRouter = createBrowserRouter([
            {
                path: "/",
                element :<Login />,
            },
            {
                path: "/app",
                element: <App />,
                children: [
                  { path: "gptSearch", element: <GptSearch /> },
                  {
                    path: "movie/:movieId",
                    element: <Movie />,
                  },
                  { path: "browse", element: <Browse /> },
                  { path: "review", element: <Comments /> },
                  { path: "favourite", element: <Favourite /> },
                  { path: "watchlist", element: <WatchList /> },
                ],
              },
        ]);    

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body