import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import logo from '../assets/tv.png';

const Details = () => {
  const { id } = useParams();
  const apiKey = '3bd90629367bc8c7938a4ad92f398477';

  const [movieDetails, setMovieDetails] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set sidebar to open by default

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: apiKey,
            append_to_response: 'videos',
          },
        });

        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [id, apiKey]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const trailerKey = movieDetails.videos?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  )?.key;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${trailerKey}`;
  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex' data-testid='details'>
      <div className='w-[20vw] flex ml-5 mt-8 items-center h-[50px]' data-testid='details-logo-container'>
        <img
          src={logo}
          onClick={handleLogoClick}
          alt='brand logo'
          className='cursor-pointer w-[35px] h-[35px]'
          data-testid='details-logo'
        />
        <h2 onClick={handleLogoClick} className='font-bold text-2xl text-[#000] px-2' data-testid='details-title'>
          MovieBox
        </h2>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className='w-[80vw] m-8'>
        <iframe
          className='rounded-[20px]'
          width="100%"
          height="400"
          src={youtubeEmbedUrl}
          title="Trailer"
          allowFullScreen
          data-testid='details-iframe'
        ></iframe>
        <div className='py-3'>
          <h2 className='font-bold text-2xl' data-testid='details-movie-title'>{movieDetails.title} {movieDetails.year}</h2>
        </div>
        <div>
          <h3 data-testid='details-overview'>{movieDetails.overview}</h3>
        </div>
      </div>
    </div>
  );
};

export default Details;
