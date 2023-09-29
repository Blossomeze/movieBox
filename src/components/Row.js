import React, { useEffect, useState } from 'react';
import axios from '../axios';
import tmdb from '../assets/imdb.png';
import tomato from '../assets/tomato.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

function TopMovies() {
  const [topMovies, setTopMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const request = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
          params: {
            api_key: '3bd90629367bc8c7938a4ad92f398477',
          },
        });
  
        setTopMovies(request.data.results.slice(0, 12));
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    }
  
    fetchTrendingMovies();
  }, []);
  

  return (
    <div className='text-[#000] my-9 flex flex-col items-center w-[100vw]'>
      <div className='flex justify-between items-center mx-[50px] my-3 w-[95vw]'>
        <h2 className='text-4xl font-bold overflow-y-hidden'>Top Movies</h2>
        <Link to='/see-more/Top Movies' className='text-button text-lg font-normal hover:underline flex items-center'>
          See More <ChevronRightIcon />
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-14 p-5 my-8'>
        {topMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card text-[#000]" data-testid={`movie-card-${movie.id}`}>
            <img
              className='poster h-[370px] w-auto object-cover'
              src={`${base_url}${movie.poster_path}`}
              alt={movie.title}
              data-testid={`movie-poster-${movie.id}`}
            />
            <h4 className='font-bold text-graytext text-xs py-2' data-testid={`movie-date-${movie.id}`}>
              {movie?.release_date || 'Release Date Missing'}
            </h4>
            <p className='text-left font-bold text-lg' data-testid={`movie-title-${movie.id}`}>
              {movie?.title || 'Title Missing'}
            </p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-center text-center object-contain py-2'>
                <img src={tmdb} alt="tmdb logo" />
                <h4 className='pl-3' data-testid={`movie-vote-count-${movie.id}`}>
                  {movie?.vote_count ? `${movie.vote_count}/100` : 'Votes Missing'}
                </h4>
              </div>
              <div className='flex items-center justify-center text-center pl-[50px]'>
                <img src={tomato} alt="rotten tomato logo" />
                <h4 className='pl-3' data-testid={`movie-vote-average-${movie.id}`}>
                  {(movie?.vote_average ?? 0).toFixed(2)}%
                </h4>
              </div>
            </div>
            <p className='font-bold text-graytext text-xs py-2' data-testid={`movie-genres-${movie.id}`}>
              {movie?.genres ? movie.genres.map((genre) => genre.name).join(', ') : 'Genres Missing'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopMovies;
