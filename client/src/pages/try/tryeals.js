import React, { useState, useEffect } from 'react';
import './tryeals.css';
import { BsBookmarksFill, BsBookmarks } from "react-icons/bs";
import Sidebar from '../../components/Sidebar/Sidebar';
import axios from 'axios';
import { useGetUserID } from "./../../hooks/useGetUserID";
import DetailsRecipe from '../DetailsRecipe';

function Tryeals() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [userID, setUserID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://culinashare.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const userFromLocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') || '{}');
    setUserID(userFromLocalStorage._id)

    const fetchSavedRecipes = async () => {
      try {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') || '{}');
        const response = await axios.get(`https://culinashare.onrender.com/recipes/savedRecipes/ids/${userFromLocalStorage._id}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') );
      if (!userFromLocalStorage) {
        alert('Please log in You Account!');
        return;
      }
      const response = await axios.put("https://culinashare.onrender.com/recipes", {
        recipeID,
        userID: userFromLocalStorage._id,
      });
      alert(response?.data?.message);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const deletsaveRecipe = async (recipeID) => {
    try {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') || '{}');
      if (!userFromLocalStorage) {
        alert('Please log in!');
        return;
      }
      const response = await axios.delete("https://culinashare.onrender.com/recipes", {
        data: {
          recipeID,
          userID: userFromLocalStorage._id,
        }
      });
      alert(response?.data?.message);
      setSavedRecipes(savedRecipes.filter(id => id !== recipeID));
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-gray-600 font-body">
      <div className="grid md:grid-cols-3 lg:grid-cols-4">
        <Sidebar />
        <main className="bg-gray-100 scrolling-v md:col-span-2 lg:col-span-3 min-h-screen ">
          <div className='main-mg-poster'>
            {(!userID) ? (
              <div className="flex justify-end md:justify-end mb-6">
                <a
                  href="/login"
                  className="btn bg-red-600 hover:bg-orange-700 border-primary md:border-2 bg-primary text-white transition ease-out duration-500"
                >Log in</a>
                <a
                  href="/signup"
                  className="ms-3 btn bg-red-600 hover:bg-orange-700 border-primary md:border-2 bg-primary text-white transition ease-out duration-500"
                >Sign up</a>
              </div>
            ) : null }
            <header>
              <h2 className="text-slate-100 text-6xl font-semibold">Quick And Easy Recipes </h2>
              <h3 className="text-2xl text-slate-100 font-semibold">For RecipeShare</h3>
            </header>
            {/* Search bar */}
            <form className="flex items-center max-w-lg mx-auto mt-6" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="recipe-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="recipe-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="Search Recipes by Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 7-4-4m0 7a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-7 9v-3m3 3h-6m0-7a7 7 0 0 1-7-7V4a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2a3 3 0 0 0-3 3v2a7 7 0 0 0 7 7Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="px-16 py-6">
            <div>
              <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">
                Latest Recipes
              </h4>
              <div className="mt-8 grid lg:grid-cols-3 gap-10">
                {filteredRecipes?.map((recipe) => (
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
                    {isRecipeSaved(recipe._id) ?
                      (<span
                        onClick={() => deletsaveRecipe(recipe._id)}
                        className='save-icon'>
                        <BsBookmarksFill />
                      </span>) :
                      <span
                        onClick={() => saveRecipe(recipe._id)}
                        className='save-icon'>
                        <BsBookmarks />
                      </span>
                    }
                    <span className="block ml-4 text-gray-500 show-more text-sm" onClick={() => {
                      window.location.href = `/${recipe._id}`
                    }}> Show More... </span>
                  </div>
                ))}
              </div>
              {/* <h4 className="font-bold mt-12 pb-2 border-b border-gray-200">
                Most Popular
              </h4> */}
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
