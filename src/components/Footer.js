import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <div className='flex flex-col justify-center items-center text-center py-4 mt-10'>
      <div>
        <span><FacebookIcon /></span>
        <span><InstagramIcon /></span>
        <span><TwitterIcon /></span>
        <span><YouTubeIcon /></span>
      </div>
      <div className='py-4'> 
        <nav className='lg:text-lg text-base font-bold'>
            <a href='/' className='hover:text-graytext lg:px-4'>Conditions of Use</a>
            <a href='/' className='hover:text-graytext px-3 lg:px-4'>Privacy Policy</a>
            <a href='/' className='hover:text-graytext lg:px-4'>Press Room</a>
        </nav>
      </div>
      <div>
        <h6 className='text-graytext font-bold text-lg'>© 2021 MovieBox by Blossom Eze</h6>
      </div>
    </div>
  )
}

export default Footer
