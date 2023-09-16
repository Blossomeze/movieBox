import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/tv.png';

const Sidebar = ({ isOpen, onClose }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    onClose();
  };

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItem = [
    // Your menu items...
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[20vw] bg-white text-black transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } border-r border-button border-solid rounded-r-[45px]`}
    >
      <div className="p-4">
        <div onClick={toggleSidebar} className='w-[20vw] flex ml-5 mt-8 items-center'>
          <img
            src={logo}
            onClick={handleLogoClick}
            alt='brand logo'
            className='cursor-pointer w-[35px] h-[35px]'
          />
          <h2 onClick={handleLogoClick} className='font-bold text-2xl cursor-pointer text-[#000] px-2'>MovieBox</h2>
        </div>
      </div>
      <nav>
        <ul>
          {menuItem.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                activeClassName="bg-gray-200 border-r border-black"
                className="flex items-center p-4 space-x-2 text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out rounded-r-full"
              >
                <div>{item.icon}</div>
                <div className='flex'>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <button>{item.name}</button>
                  </div>
                  <div>
                    <p>{item.overview}</p>
                  </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
