import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Row from './Row'; // Import the Row component

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null); // Add an error state
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

  return (
    <div>
      <h2>Search Results for: {query}</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-wrap mx-3">
          {searchResults.length === 0 ? (
            <p>No movies found. Try a different search term or explore our recommendations.
              <Row title="Recommendations" />
            </p>
            
          ) : (
            searchResults.map((movie) => <Row title={`Search results for ${query}`} key={movie.id} movie={movie}  movies={searchResults} />)
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
