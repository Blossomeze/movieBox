import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Details from './Details';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q'); // Get the search query from the URL query parameter

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your TMDb API key
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: apiKey,
            query,
          },
        });

        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
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

  return (
    <div>
      <h2>Search Results for: {query}</h2>
      <div className="flex flex-wrap">
        {searchResults.map((movie) => (
            <Details />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
