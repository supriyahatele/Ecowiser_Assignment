const { RecipeModel } = require("../models/recipeModel");



// Add a new recipe
 const createRecipe=async (req, res) => {
  const { title, description, ingredients, steps, image } = req.body;
  
  // Validate inputs
  if (!Array.isArray(ingredients) || !Array.isArray(steps)) {
    return res.status(400).json({ msg: 'Ingredients and steps must be arrays' });
  }

  try {
    const newRecipe = new RecipeModel({
      title,
      description,
      ingredients,
      steps,
      image,
      createdBy: req.userId
    });
    const recipe = await newRecipe.save();
    return res.json(recipe);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

// Get all recipes
 const getAllRecipes= async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    return res.status(200).json(recipes);
  } catch (err) {
    console.error(err.message);
   return res.status(500).send('Server error');
  }
};

// Get a specific recipe by ID
  const getRecipeById=async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
   return res.status(200).json(recipe);
  } catch (err) {
    console.error(err.message);
   return  res.status(500).send('Server error');
  }
};

// Update a recipe
  const updateRecipe=async (req, res) => {
  const { title, description, ingredients, steps, image } = req.body;

  // Validate inputs
  if (ingredients && !Array.isArray(ingredients)) {
    return res.status(400).json({ msg: 'Ingredients must be an array' });
  }
  if (steps && !Array.isArray(steps)) {
    return res.status(400).json({ msg: 'Steps must be an array' });
  }

  try {
    let recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const updatedFields = { title, description, ingredients, steps, image };
    recipe = await RecipeModel.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });

    return res.status(200).json(recipe);
  } catch (err) {
    console.error(err.message);
  return  res.status(500).send('Server error');
  }
};

// Delete a recipe
 const deleteRecipe=async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await RecipeModel.findByIdAndRemove(req.params.id);
   return  res.status(200).json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

module.exports = {createRecipe,getAllRecipes,getRecipeById,updateRecipe,deleteRecipe};
