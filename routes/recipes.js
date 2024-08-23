const express = require('express');
const router = express.Router();
const Recipe = require('../models/RecipeModel.js');  // import our recipe model

// GET all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();  // Fetch all recipes from the database
        res.json(recipes); // Send recipes as a JSON response
    } catch (err){
        res.status(500).json( {message: err.message});
    }
});

// POST request: save a new recipe
router.post('/', async (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    });
    try {
        const newRecipe = await recipe.save();  // attempt save the recipe to the database asynchronously
        res.status(201).json(newRecipe) // Respond with the newly created recipe
    } catch(err){
        res.status(500).json({message: err.message});
    }
});


// GET request: find recipe by slug
router.get('/:slug', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id); // find recipe by ID from the database
        if(!recipe) return res.status(404).json({message: 'Recipe not found!'}); // return 404 not found if we dont have it
        res.json(recipe); // otherwise, return the json of the new recipe
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

// PUT request: update a recipe by slug
router.put('/:slug', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.params.body); // find the recipe by id and update it 
        if (!recipe) return res.status(404).json({message: "Recipe not found"}); 
        res.json(recipe);
    } catch (err){
        res.status(400).json({message: err.message});
    }
});

router.delete('/:slug', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id); // find and delete the recipe
        if(!recipe) return res.status(404).json({message: "Recipe not found!"});
        res.json({message: "Recipe deleted!"});
    } catch(err){
        res.status(500).json({message: err.message});
    }
});


module.exports = router;