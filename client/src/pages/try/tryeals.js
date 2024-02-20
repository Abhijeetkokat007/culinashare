import React, { useState, useEffect } from 'react';
import './tryeals.css';
import { BsBookmarksFill, BsBookmarks } from "react-icons/bs";
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useGetUserID } from "./../../hooks/useGetUserID";
function Tryeals() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [] )


  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:5000/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
 

  const isRecipeSaved = (id) => savedRecipes.includes(id);


  return (
    <div className="text-gray-600 font-body">
      <div className="grid md:grid-cols-3 lg:grid-cols-4">

        <Sidebar />

        <main className="bg-gray-100  md:col-span-2 lg:col-span-3 min-h-screen">

          <div className='main-mg-poster'>
            <div className="flex justify-center md:justify-end">
              <a
                href="/login"
                className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
              >Log in</a>
              <a
                href="/signup"
                className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500 ml-2"
              >Sign up</a>
            </div>
            <header>
              <h2 className="text-slate-100 text-6xl font-semibold">Quick & Easy Recipes </h2>
              <h3 className="text-2xl text-slate-100 font-semibold">For Ninjas</h3>
            </header>
            {/* search bar */}

            <form class="flex items-center max-w-lg mx-auto mt-6">   
    <label for="voice-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
            </svg>
        </div>
        <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  " placeholder="Search Recipes here ..." required />
        <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
            </svg>
        </button>
    </div>
    <button type="submit" class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-red-500 rounded-lg border border-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Search
    </button>
</form>



          </div>
          <div className='px-16 py-6'>
            <div>
              <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">
                Latest Recipes
              </h4>
              <div className="mt-8 grid lg:grid-cols-3 gap-10">

                {
                  recipes?.map((recipe) => {
                    return (
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
                          <span
                            onClick={() => saveRecipe(recipe._id)}
                            disabled={isRecipeSaved(recipe._id)}
                            className='save-icon'>
                            {isRecipeSaved(recipe._id) ? <BsBookmarksFill /> : <BsBookmarks />}
                          </span>
                        </div>

                      </>
                    )
                  })
                }




              </div>
              <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">
                Most Popular
              </h4>
              <div className="mt-8">
                {/* cards */}
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
          </div>
        </main>
      </div>

    </div>
  );
}

export default Tryeals;
