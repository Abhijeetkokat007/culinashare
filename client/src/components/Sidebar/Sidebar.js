
import React, { useState, useEffect } from 'react';
import { BsBookmarks } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import "./Sidear.css"
function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userdata, setUserdata] = useState({});

  useEffect(() => {
    const userFromlocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') || '{}');
    setUserdata(userFromlocalStorage);
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <div className="md:col-span-1 md:flex pl-5 md:justify-start">
        <nav className="text-right">
          <div className="flex justify-between items-center">
            <h1 className="font-bold uppercase p-4 border-b text-3xl border-gray-100">
              <a href="/" className="hover:text-gray-700 text-gray-800">Recipe<span className='text-red-600'>SHARE</span></a>
            </h1>

            <div className="px-4 cursor-pointer md:hidden" id="burger" onClick={toggleMenu}>
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          <ul className={`text-sm mt-6 ${isMenuOpen ? '' : 'hidden'} md:block`} id="menu">

            <li className="text-gray-700 font-bold py-3 hover:bg-gray-100">
              <a
                href="/"
                className="px-4 flex justify-start border-r-4 border-none"
              >
                <svg
                  className="w-5 ml-2 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Home</span>
              </a>
            </li>

            {/* <li className="py-3 hover:bg-gray-100">
              <a href="#" className="px-4 flex justify-start border-none border-r-4 "
              >
                <svg
                  className="w-5 ml-2 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>About</span>
              </a>
            </li> */}

            <li className="py-3 hover:bg-gray-100">
              <a href="/create-recipe" className="px-4 flex justify-start border-r-4 border-none"
              >
                <svg
                  className="w-5 ml-2 mr-2 font-s-20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <FiPlusCircle />
                </svg>
                <span>Create</span>
              </a>
            </li>

            <li className="py-3 hover:bg-gray-100 w-full">
              <a href="/saved-recipes" className="px-4 flex justify-start border-r-4 border-none"
              >
                <svg
                  className="w-5 ml-2 mr-2 font-s-20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <BsBookmarks />
                </svg>
                <span>Saved</span>
              </a>
            </li>

            <li className="py-3 hover:bg-gray-100">
              <a href="/contact" className="px-4 flex justify-start border-r-4 border-none"
              >
                <svg
                  className="w-5 mr-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Contact</span>
              </a>
            </li>



            <li className="py-3 hover:bg-gray-100 w-full">
              <a href="/saved-recipes" className="px-4 flex justify-start border-r-4 border-none"
              >

                <img width="30px" className='w-6 ml-2 mr-2 ' src='https://www.nicepng.com/png/full/202-2024687_profile-icon-png.png' />

                <span> {userdata.username ? userdata.username : " User"}</span>
              </a>
            </li>

            { userdata.username ? (
              <li className="py-3  w-full">
                <button className=" border-primary flex mx-auto mt-10  hover:text-gray-100  text-primary bg-gray-100  py-1 px-8 focus:outline-primary hover:bg-primary rounded text-lg  "
                onClick={() => {
                  localStorage.removeItem("recipes-app-data");
                  window.location.href = "/login"
                }}
                >

                  <span>Logout</span>
                </button>
              </li>
            ) : null
            }

          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
