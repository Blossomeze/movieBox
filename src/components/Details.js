import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import logo from '../assets/tv.png';

const Details = () => {
  const { id } = useParams();
  const apiKey = '3bd90629367bc8c7938a4ad92f398477';

  // Move the useState calls to the top of the component
  const [movieDetails, setMovieDetails] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: apiKey,
            append_to_response: 'videos', // Request videos in addition to movie details
          },
        });

        // Set the movie details in state
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    // Call the fetchMovieDetails function
    fetchMovieDetails();
  }, [id, apiKey]);

  // Render loading message while fetching data
  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  // Extract the trailer key (assuming the first one is the official trailer)
  const trailerKey = movieDetails.videos?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  )?.key;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${trailerKey}`;
  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex'>
        <div className='w-[20vw] flex ml-5 mt-8 items-center h-[50px]'>
           <img
        src={logo}
        onClick={handleLogoClick}
        alt='brand logo'
        className='cursor-pointer w-[35px] h-[35px]'
      /> <h2 onClick={handleLogoClick} className='font-bold text-2xl text-[#000] px-2'>MovieBox</h2>
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
        ></iframe>
        <h2>{movieDetails.title}</h2>
      </div>
    </div>
  );
};

export default Details;
