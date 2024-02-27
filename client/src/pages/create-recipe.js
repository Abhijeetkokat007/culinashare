import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') );
  const userID = userFromLocalStorage._id;
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('recipes-app-data') );
      if (!userFromLocalStorage) {
        alert('Please log in You Account!');
        window.location.href = "/login";
        return
      }
    const response =  await axios.post("https://culinashare.onrender.com/recipes", { ...recipe });
    if (response?.data?.success) {
      window.location.href = "/";
      // showToast(response?.data?.message, 'success', 3000)
      alert(response?.data?.success)
    }
    else{
      alert("All Field Required")
    }
    
    } catch (error) {
      console.error(error);
    }
  };

  return (
  

    <div className="flex flex-wrap">
  <div className="flex w-full flex-col md:w-1/2">
  <div className="flex ">
      <a href="/" className=" m-3 pb-2  mb-3 btn btn-primary rounded-2xl border  text-red-500 border-red-500 hover:text-gray-100 hover:bg-red-500 ">Back Home  </a>
    </div>
    {/* 00000000000000 */}

     <div className="mr-auto ml-auto mt-6">
      
     <h1 className=" border-b-4 pb-2 text-center ml-auto mr-auto text-2xl font-bold text-gray-900"> Create a New Recipe  </h1>
       <div className="create-recipe mr-auto ml-auto">
         
         <form onSubmit={handleSubmit}>
           <label htmlFor="name">Title</label>
           <input
             className="w-full mb-3 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             type="text"
             id="name"
             name="name"
             value={recipe.name}
             onChange={handleChange}
           />
           <label htmlFor="description">Description</label>
           <textarea
             className="w-full mb-3 bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             id="description"
             name="description"
             value={recipe.description}
             onChange={handleChange}
           ></textarea>
           <label htmlFor="ingredients">Steps</label>
           {recipe.ingredients.map((ingredient, index) => (
             <input
               className="w-full m-1 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               key={index}
               type="text"
               name="ingredients"
               value={ingredient}
               onChange={(event) => handleIngredientChange(event, index)}
             />
           ))} <br />
           <button class="mb-3 btn btn-primary rounded-2xl border  text-red-500 border-red-500" type="button" onClick={handleAddIngredient}>
             Add ➕
           </button> <br />
           <label htmlFor="instructions">Instructions</label>
           <textarea
             className="mb-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             id="instructions"
             name="instructions"
             value={recipe.instructions}
             onChange={handleChange}
           ></textarea>
           <label htmlFor="imageUrl">Image URL</label>
           <input
             className="mb-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             type="text"
             id="imageUrl"
             name="imageUrl"
             value={recipe.imageUrl}
             onChange={handleChange}
           />
           <label htmlFor="cookingTime">Cooking Time (minutes)</label>
           <input
             className="w-full  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
             type="number"
             id="cookingTime"
             name="cookingTime"
             value={recipe.cookingTime}
             onChange={handleChange}
           />
           <div className="text-center p-5">
             <button className="p-2 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-400 rounded text-lg" type="submit">Create Recipe</button>
           </div>
         </form>
       </div>
     </div>
    {/* .......... */}
  </div>
  <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
    <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
      <p className="mb-8 text-3xl font-semibold leading-10">We work 10x faster than our compeititors and stay consistant. While they're bogged won with techincal debt, we're realeasing new features.</p>
      <p className="mb-4 text-3xl font-semibold">John Elmond</p>
      <p className="">Founder, Emogue</p>
      <p className="mb-7 text-sm opacity-70">Web Design Agency</p>
    </div>
    <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxmDwWhVfoMgtUHniqBnLwjEG64ZmpG3jgfG-r1FiKw&s" />
  </div>
</div>
  );
};
