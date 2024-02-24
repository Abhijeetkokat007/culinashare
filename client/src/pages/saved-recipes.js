import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";


export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') );
        if (!userFromLocalStorage) {
          alert('Please log in You Account!');
          window.location.href = "/login";
          return
        }
        const user = JSON.parse(localStorage.getItem('recipes-app-data') || '{}');
        const response = await axios.get(
          `https://culinashare.onrender.com/recipes/savedRecipes/${user._id}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [] );
  return (
   <>
     
      <div className="text-gray-600 font-body">
      <div className="grid md:grid-cols-3 lg:grid-cols-4">
        
      <Sidebar/>
        
        <main className="bg-gray-100 px-16 py-6 md:col-span-2 lg:col-span-3 min-h-screen">
          
          <header>
            <h2 className="text-gray-700 text-6xl font-semibold">All Saved Recipes</h2>
            <h3 className="text-2xl font-semibold"> </h3>
          </header>
          <div>
            
            <div className="mt-8 grid lg:grid-cols-3 gap-10">
              
              {
                savedRecipes?.map((recipe)=>{
                 return(
                  <>
                  <div key={recipe._id} className="card hover:shadow-lg">
                  <img
                    src={recipe.imageUrl}
                    alt="curry"
                    className="w-full h-32 sm:h-48 object-cover"
                  />
                  <div className="m-4">
                    <span className="font-bold">{recipe.name}</span>
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
                    <span>{recipe.cookingTime} mins</span>
                  </div>
                  
                </div>
              
              </>
                 )
                })
              }
              
             


            </div>
           
            <div className="flex justify-center">
              <div
                className="
                  btn
                  bg-secondary-100
                  text-secondary-200
                  hover:shadow-inner
                  transform
                  hover:scale-125
                  hover:bg-opacity-50
                  transition
                  ease-out
                  duration-300
                "
              >
                Load more
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};
