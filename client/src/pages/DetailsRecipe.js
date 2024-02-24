import React, { useState, useEffect } from 'react'; // Importing React, useState, and useEffect
import { useParams } from 'react-router-dom'; // Importing useParams to get parameters from URL
import axios from 'axios'; // Importing Axios for HTTP requests
import Sidebar from '../components/Sidebar/Sidebar'; // Importing Sidebar component

function DetailsRecipe() {
    const [recipe, setRecipe] = useState({}); // State to store recipe data
    const { recipeId } = useParams(); // Getting recipeId from URL params

    // Function to fetch recipe details
    const loadRecipe = async () => {
        try {
            // Fetching recipe details using recipeId
            const response = await axios.get(`https://culinashare.onrender.com/recipes/${recipeId}`);
            // Setting recipe data in state
            setRecipe(response?.data?.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Fetch recipe details when component mounts
    useEffect(() => {
        loadRecipe();
    }, [recipeId]); // Dependency on recipeId ensures re-fetching when ID changes

    return (
        <div className="text-gray-600 font-body">
            <div className="grid md:grid-cols-3 lg:grid-cols-4">
                {/* Sidebar Component */}
                <Sidebar />

                {/* Main Content */}
                <main className="bg-gray-100 scrolling-v md:col-span-2 lg:col-span-3 min-h-screen">
                    <div className="min-h-screen  px-4 py-5 space-y-3">
                        {/* Recipe Image */}
                        <img className='w-full' src={recipe.imageUrl} alt={recipe.name} />
                        <div className="space-y-2 p-6">
                            {/* Recipe Title */}
                            <h1 className="text-2xl">{recipe.name}</h1>
                            {/* Additional Recipe Information */}
                            <div className="flex flex-col space-y-1">
                                <span>Health Score: 95</span>
                                <span>Aggregate Likes: 95</span>
                                <span>Weight Watcher Smart Points: 7</span>
                                <span>Healdy: 160.46</span>
                            </div>
                            <p className='py-6'>Cooking Time: {recipe.cookingTime} min </p>
                            {/* Recipe Tags */}
                            <div className='flex flex-wrap'>
                                <span className="bg-red-200 m-5 rounded-md px-4 py-2">Teasty</span>
                                <span className="bg-teal-200 rounded-md m-5  px-4 py-2">Dairy Free</span>
                                <span className="bg-emerald-200 rounded-md m-5 px-4 py-2">Very Healthy</span>
                                <span className="bg-indigo-200 rounded-md m-5 px-4 py-2">Very Popular</span>
                            </div>
                        </div>
                        <div className='p-6'>
                            {/* Recipe Description */}
                            <span>
                                {recipe.description}
                            </span>
                        </div>
                        <div className='p-6'>
                            {/* Recipe Ingredients */}
                            <h1 className="text-lg">Steps:</h1>
                            <ul className="list-disc pl-5">
                                {/* Mapping over recipe ingredients */}
                                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='p-6'>
                            {/* Recipe Instructions */}
                            <h1 className="text-lg">Instructions:</h1>
                            <ul className="list-decimal pl-5">
                                {/* Mapping over recipe instructions */}
                                {recipe.instructions && recipe.instructions.split('\n').map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DetailsRecipe;
