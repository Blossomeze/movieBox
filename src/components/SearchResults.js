import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SearchRow from './SearchRow'; // Import the Row component
import Sidebar from './Sidebar';
import logo from '../assets/tv.png';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null); // Add an error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q'); // Get the search query from the URL query parameter

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const apiKey = '3bd90629367bc8c7938a4ad92f398477'; // Replace with your TMDb API key
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: apiKey,
            query,
          },
        });

        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('An error occurred while fetching search results.');
      }
    }

    if (query) {
      // Fetch search results only if there is a valid query
      fetchSearchResults();
    } else {
      // Clear search results if no query is provided
      setSearchResults([]);
    }
  }, [query]);

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  console.log(searchResults);

  return (
    <div>
      <div className='flex mx-10'>
        <div className='flex mt-8 items-center h-[50px]'>
           <img
        src={logo}
        onClick={handleLogoClick}
        alt='brand logo'
        className='cursor-pointer w-[35px] h-[35px]'
      /> <h2 onClick={handleLogoClick} className='font-bold text-2xl text-[#000] px-2'>MovieBox</h2>
        </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-wrap mx-3 my-2">
          {searchResults.length === 0 ? (
            <p>No movies found. Try a different search term or explore our recommendations.</p>
          ) : (
            <SearchRow title={`Search results for : ${query}`} movies={searchResults} />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
