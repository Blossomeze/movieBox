import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './components/Details';
import Home from './components/Home';
import SearchResults from './components/Results';

const App = () => {
    return (
    <Router>
      <div className="flex">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/movie/:id" element={<Details />} />
          </Routes>
          <Routes>
            <Route path="search_results/movie/:id" element={<SearchResults />} />
          </Routes>
      </div>
    </Router>
  );
}


export default App;
