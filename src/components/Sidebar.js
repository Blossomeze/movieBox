import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/tv.png';
import VideocamIcon from '@mui/icons-material/Videocam';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Sidebar = ({ isOpen, onClose }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    onClose();
  };

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItem = [
    {
      path: '/',
      name: 'Home',
      icon: (
        <HomeIcon />
      ),
    },
    {
      path: '/movies',
      name: 'Movies',
      icon: (
      <VideocamIcon />
      ),
    },
    {
      path: '/tv_series',
      name: 'TV Series',
      icon: (
        <LiveTvIcon />
      ),
    },
    {
      path: '/upcoming',
      name: 'Upcoming',
      icon: (
        <CalendarMonthIcon />
      ),
    }
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[17vw] overflow-hidden bg-white text-black transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } border-r border-button border-solid rounded-r-[45px]`}
    >
      <div className="p-4 mb-3">
        <div onClick={toggleSidebar} className='w-[20vw] flex ml-5 mt-5 items-center'>
          <img src={logo} onClick={handleLogoClick} alt='brand logo' className='cursor-pointer w-[35px] h-[35px]' />
          <h2 onClick={handleLogoClick} className='font-bold text-2xl cursor-pointer text-[#000] px-2'>MovieBox</h2>
        </div>
        <div>
        </div>
      </div>
      <nav className='text-[#000]'>
        <ul>
          {menuItem.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
              >
                <div className='pl-[50px] flex hover:bg-gray-200 hover:border-r-4 hover:border-button hover:bg-button hover:bg-opacity-10 hover:text-button transition duration-300 ease-in-out py-4 items-center text-xl font-semibold'>
                  <p>{item.icon}</p>
                  <p>{item.name}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-button bg-opacity-10 rounded-[20px] border-2 border-button mx-5 my-3 p-5 text-[#000]">
          <h2 className="font-semibold pt-6 pb-3">Play movie quizzes and earn free tickets</h2>
          <h3>50k people are playing now</h3>
          <div className="text-center">
            <button className="bg-button bg-opacity-10 border-2 border-button rounded-[30px] text-xs font-medium py-2 px-3 text-button">Start Playing</button>
          </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
