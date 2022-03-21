import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import HorizontalScroll from 'react-scroll-horizontal'
import './Row.scss'

const base_url ="https://image.tmdb.org/t/p/original/"; 

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    
    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
              setMovies(request.data.results);
              return request;
        } 
      fetchData();
    }, [fetchUrl]);
    
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    
    const handleClick = (movie) => {
          if (trailerUrl) {
            setTrailerUrl("");
          } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
              // https://www.youtube.com/watch?v=XtMThy8Qqu 
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => alert("Unexpected Error Can't play video right now "));
          }
    };
     

  return(
   <div className="row"> 
       <h2>{title}</h2>

      <div className="row__posters" >    

       {/* <HorizontalScroll>  */}
          {movies.map((movie) => (
              <img 
              key={movie.id} 
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
              alt={movie.name} />
          ))}
        {/* </HorizontalScroll> */}

        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }  
    </div>
    )
};

export default Row;
