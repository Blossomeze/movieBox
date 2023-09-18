import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './components/Details';
import Home from './components/Home';
import SearchResults from './components/SearchResults';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
