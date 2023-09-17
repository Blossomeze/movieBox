import React, { useEffect, useState } from 'react'
import play from '../assets/Play.png'
import axios from '../axios';
import requests from '../requests'
import tmdb from '../assets/imdb.png'
import tomato from '../assets/tomato.png'

function Banner() {

  const [movie, setMovie] =useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      )
    }
    fetchData();
  }, [])

  console.log(movie);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n-1) + '...' : string;
  }
  return (
    <header className='h-[600px] relative text-white object-contain' style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center"
    }}>
      <div style={{
          backgroundImage: "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)",
          height: "7.4rem",
          bottom: "0",
          position: "absolute"
        }} />
        <div className='ml-[30px] pt-[200px] px-[18px]'>
            <h1 className="text-5xl font-bold leading-[56px] pb-2 max-w-[500px]">{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className='flex items-center pl-1 justify-between max-w-[200px]'>
              <div className='flex items-center justify-center text-center'>
              <img src={tmdb} alt="tmdb logo" />
              <h4 className='pl-3'>{movie?.vote_count}/100</h4>
              </div>
              <div className='flex items-center justify-center text-center pl-[20px]'>
                <img src={tomato} alt="rotten tomato" />
                <h4 className='pl-3'>{movie?.vote_average * 10}%</h4>
              </div>
            </div>
            <h4 className='font-medium text-sm leading-[18px] max-w-[360px] h-20 pb-4 pt-2'>{truncate(movie?.overview, 150)}</h4>
            <button className='bg-button text-sm leading-6 flex items-center rounded-md px-5 py-[6px] hover:bg-graytext hover:text-black hover:transition-all mt-2 relative'><img className='pr-2' src={play} alt="play sign" /> TRAILER</button>
        </div>
    </header>
  )
}

export default Banner
