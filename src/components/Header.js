import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';
import Sidebar from './Sidebar';
import menu from '../assets/Menu.png';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [show, handleShow] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  const navigate = useNavigate();

  const transitionHeader = () => {
    if (window.scrollY > 120) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Navigate to the search results page with the query parameter
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionHeader);
    return () => window.removeEventListener('scroll', transitionHeader);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full ${show && ''}`}
      style={{
        zIndex: 1,
      }}
    >
      <div
        className={`flex px-5 lg:px-12 py-3 items-center text-center justify-between ${
          show && 'flex px-12 py-3 bg-primary opacity-80 items-center text-center justify-between'
        }`}
      >
        <div>
          <Link to='/'>
            <img src={logo} alt='brand logo' />
          </Link>
        </div>
        <div className='relative mx-4 hidden lg:flex'>
          <form onSubmit={handleSearchSubmit}>
            <input
              type='text'
              placeholder='Search movies by title'
              style={{
                border: '1px solid #D1D5DB',
                padding: '6px 10px',
                borderRadius: '6px',
                background: 'none',
                width: '35vw',
                color: '#fff',
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
            <SearchIcon className='search absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400' />
          </form>
        </div>
        <div className='flex text-center items-center'>
          <a href='/' className='px-4 text-white font-bold'>
            Sign In
          </a>
          <img className='cursor-pointer' onClick={handleLogoClick} src={menu} alt='dehazeicon' />
        </div>
      </div>
      {isSidebarOpen && (
        <div className='fixed top-0 left-0 h-screen w-[60vw] lg:w-1/3 bg-gray-800 text-white transition-transform duration-300 transform translate-x-0'>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Header;
