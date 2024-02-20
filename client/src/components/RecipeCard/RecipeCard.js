import React from 'react'
import { BsBookmarksFill, BsBookmarks } from "react-icons/bs";
function RecipeCard({image}) {
  return (
    <div>
        <div className="card hover:shadow-lg">
                <img
                  src={image}
                  alt="stew"
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="m-4">
                  <span className="font-bold">5 Bean Chilli Stew</span>
                  <span className="block text-gray-500 text-sm">Recipe by Mario</span>
                </div>
                <div className="badge">
                  <svg
                    className="w-5 inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>25 mins</span>
                </div>
               <span className='save-icon'> <BsBookmarksFill /></span>
              </div>  
                 {/* src="https://i.ibb.co/ZdP6cKQ/curry.jpg"
      src="https://i.ibb.co/b1DQyfG/noodles.jpg"
      src="https://i.ibb.co/b1DQyfG/noodles.jpg"   */}
    </div>
    
  )
}

export default RecipeCard
