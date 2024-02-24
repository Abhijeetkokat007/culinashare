import express from "express";
import mongoose from "mongoose";
import  {RecipesModel}  from "./../models/Recipes.js";
import  {UserModel}  from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post("/",  async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);

  try {
    const result = await recipe.save();
    res.status(201).json({
      success: true,
      data: result,
      message: "Recipy Created Succesfilly ."
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message
  })
  }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json(
      {
        success:true,
        data: result,
        message: "successfully found recipes "
      }
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Save a Recipe
// router.put("/", async (req, res) => {
//   const recipe = await RecipesModel.findById(req.body.recipeId);
//   const user = await UserModel.findById(req.body.userID);
//   try {
//     user.savedRecipes.push(recipe);
//     await user.save();
//     res.status(201).json({ 
//       success: true,
//       savedRecipes: user.savedRecipes, 
//       message:"Recipe Saveed Successfully"
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

router.put("/", async (req, res) => {
  try {
    
    const recipe = await RecipesModel.findById(req.body.recipeID);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    const user = await UserModel.findById(req.body.userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.savedRecipes.push(recipe);
    await user.save();

    res.status(201).json({ 
      success: true,
      savedRecipes: user.savedRecipes, 
      message: "Recipe saved successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// router.get("/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const product1 = await RecipesModel.findById(_id);
//   res.json({
//       success: true,
//       data: product1,
//       message: `successfully find one product data. `,
//   });
// })

router.delete("/", async (req, res) => {
  try {
    const recipeID = req.body.recipeID;
    const userID = req.body.userID;

    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const index = user.savedRecipes.indexOf(recipeID);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found in user's saved recipes",
      });
    }

    user.savedRecipes.splice(index, 1);
    await user.save();

    res.status(200).json({ 
      success: true,
      savedRecipes: user.savedRecipes, 
      message: "Recipe removed successfully from user's saved recipes"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


export { router as recipesRouter };
