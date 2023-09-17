import React, { useEffect, useState } from 'react';
import axios from '../axios';
import tmdb from '../assets/imdb.png';
import tomato from '../assets/tomato.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  
  return (
    <div className='text-[#000] my-9 flex flex-col'>
      <div className='flex justify-between items-center mx-[50px] my-3'>
        <h2 className='text-4xl font-bold overflow-y-hidden'>{title}</h2>
        {/* Link to a see more page */}
        <Link to={`/see-more/${title}`} className='text-button text-lg font-normal hover:underline flex items-center'>
          See More <ChevronRightIcon />
        </Link>
      </div>
      <div className='scroll flex overflow-y-hidden justify-between mx-3 flex-wrap p-5 my-6'>
        {movies.map((movie) => (
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card flex-shrink-0 w-[21vw] p-2 mx-3 text-[#000]">
              <img
                className={`poster ${isLargeRow ? 'large-poster' : 'h-[370px] w-auto object-cover'}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              <h4 className='font-bold text-graytext text-xs py-2'>
                {movie?.release_date || 'Release Date Missing'}
              </h4>
              <p className="text-left font-bold text-lg">
                {movie?.title || 'Title Missing'}
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center justify-center text-center object-contain py-2'>
                  <img src={tmdb} alt="tmdb logo"/>
                  <h4 className='pl-3'>{movie?.vote_count ? `${movie.vote_count}/100` : 'Votes Missing'}</h4>
                </div>
                <div className='flex items-center justify-center text-center pl-[50px]'>
                  <img src={tomato} alt="rotten tomato logo" />
                  <h4 className='pl-3'>{(movie?.vote_average ?? 0).toFixed(2)}%</h4>
                </div>
              </div>
              <p className='font-bold text-graytext text-xs py-2'>
                {movie?.genres ? movie.genres.map((genre) => genre.name).join(', ') : 'Genres Missing'}
              </p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}

export default Row;
