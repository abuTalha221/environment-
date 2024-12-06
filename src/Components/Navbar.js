import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 w-full z-10 bg-white shadow-md'>
      <div className='relative mx-auto bg-[#b7e5f5] flex justify-between items-center py-4 px-6 md:px-20 lg:px-32'>
        <img src={assets.logo} alt="Logo" className='w-32 h-14 object-contain' />

        <ul className='hidden md:flex gap-8 text-gray-700 text-lg'>
          <li>
            <a href="#home" className='cursor-pointer hover:text-[#EC733B] hover:underline underline-offset-4 transition duration-200 ease-in-out'>
              Home
            </a>
          </li>
          <li>
            <a href="#features" className='cursor-pointer hover:text-[#EC733B] hover:underline underline-offset-4 transition duration-200 ease-in-out'>
              Features
            </a>
          </li>
          <li>
            <a href="#about-us" className='cursor-pointer hover:text-[#EC733B] hover:underline underline-offset-4 transition duration-200 ease-in-out'>
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className='cursor-pointer hover:text-[#EC733B] hover:underline underline-offset-4 transition duration-200 ease-in-out'>
              Contact
            </a>
          </li>
        </ul>

        <div className='hidden md:flex gap-4'>
          <Link to="/login">
            <button className='text-[#EC733B] px-6 py-2 border-2 border-[#EC733B] rounded-lg hover:bg-[#EC733B] hover:text-white transition duration-200 ease-in-out'>
              LOGIN
            </button>
          </Link>
          <Link to="/signup">
            <button className='text-white bg-[#EC733B] px-6 py-2 border-2 border-[#EC733B] rounded-lg hover:bg-[#d25e2d] transition-transform duration-300 ease-in-out transform hover:translate-x-2'>
              Sign Up <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button id="menu-btn" className="text-[#EC733B] focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
