import React, { useState, useContext } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import { ThemeContext } from '../context/ThemeProvider';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 shadow">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <SunIcon className="h-6 w-6 text-yellow-400" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center focus:outline-none"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            className="h-10 w-10 rounded-full border-2 border-blue-500"
          />
          <span className="ml-3 text-gray-700 dark:text-gray-300 font-semibold">
            Admin
          </span>
          <svg
            className="ml-2 h-5 w-5 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-20">
            <button
              onClick={() => alert('Logging out')}
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
