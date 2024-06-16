const express = require('express');
const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { auth } = require('../middleware/auth');


const RecipeRouter = express.Router();
// const { auth } = require('../middlewares/auth.middleware');
// const { access } = require('../middlewares/access.middleware');

// to create Recipe
RecipeRouter.post('/createRecipe',auth,  createRecipe)

// to get All Recipe
RecipeRouter.get('/getAllRecipe', getAllRecipes)

// to get single Recipe by its id
RecipeRouter.get('/getRecipeById/:id',  getRecipeById)

// to update  Recipe
RecipeRouter.patch('/updateRecipe/:id', updateRecipe)

// to delete Recipe
RecipeRouter.delete('/deleteRecipe/:id',  deleteRecipe)



module.exports ={RecipeRouter}