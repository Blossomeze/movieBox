import React, { useState } from 'react';
import Footer from './Footer';
import Row from './Row';
import requests from '../requests';
import Sidebar from './Sidebar';
import Header from './Header';
import Banner from './Banner';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className={`w-full ${isSidebarOpen ? 'ml-1/3' : ''}`}>
          <Header onLogoClick={handleLogoClick} />
          <Banner />
          <Row title="Featured Movie" fetchUrl={requests.fetchTrending} />
        <Footer />
        </div>
      </div>
  );
};

export default Home;