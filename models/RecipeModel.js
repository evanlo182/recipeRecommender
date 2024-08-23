const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true }, // Slug based on name
    indgredients: [String],
    instructions: String
});

recipeSchema.pre('save', function (next) {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
    next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;