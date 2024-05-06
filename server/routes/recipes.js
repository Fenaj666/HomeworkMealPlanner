const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error('Only images are allowed'));
    }
});

//                   ARRAYS TO STORE DATA
// Array to store recipes (initially empty)
let recipes = [];
// Array to store user plans
let caloriePlan = null;
// Array to store user schedules
let userSchedules = {};
// Array to store shopping baskets
let shoppingBasket = [];

// Route for creating a new recipe
router.post('/create', upload.single('image'), (req, res, next) => {
    // Check for required fields
    const { name, ingredients, calories, instructions } = req.body;
    if (!req.file || !name || !calories || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new recipe object
    const newRecipe = {
        id: uuidv4(),
        image: req.file.path, // Path to the uploaded image
        name,
        ingredients,
        calories,
        instructions,
    };

    // Add the new recipe to the array
    recipes.push(newRecipe);

    // Send response with the created recipe
    res.status(201).json({ success: true, recipe: newRecipe });
});
// Route for getting user's recipes
router.get('/my-recipes', (req, res, next) => {

    res.json({ success: true, recipes });
});


// Route for adding a recipe
router.post('/add', (req, res, next) => {
    res.status(201).json({ success: true, message: 'Recipe added successfully' });
});

// Route for adding ingredients to shopping basket
router.post('/add-to-basket', (req, res, next) => {
    const { ingredient } = req.body;

    if (!ingredient) {
        return res.status(400).json({ success: false, message: 'Missing ingredient data' });
    }

    shoppingBasket.push({ ...ingredient, id: uuidv4() }); // Генерируем id здесь

    res.json({ success: true, message: 'Ingredient added to the shopping basket successfully' });
});

// Route for removing ingredient from shopping basket
router.delete('/remove-from-basket/:ingredientId', (req, res, next) => {
    const ingredientId = req.params.ingredientId;

    shoppingBasket = shoppingBasket.filter(ingredient => ingredient.id !== ingredientId);

    res.json({ success: true, message: 'Ingredient removed from the shopping basket successfully' });
});

// Route for marking ingredient as purchased
router.put('/mark-as-purchased/:ingredientId', (req, res, next) => {
    const ingredientId = req.params.ingredientId;

    const ingredient = shoppingBasket.find(ingredient => ingredient.id === ingredientId);
    if (ingredient) {
        ingredient.purchased = true;
    }

    res.json({ success: true, message: 'Ingredient marked as purchased successfully' });
});

// Route for getting user's shopping basket
router.get('/get-basket', (req, res, next) => {
    res.json({ success: true, basket: shoppingBasket });
});

// Route for deleting a recipe
router.delete('/delete/:recipeId', (req, res, next) => {
    const recipeId = parseInt(req.params.recipeId);

    // Find the index of the recipe in the recipes array
    const index = recipes.findIndex(recipe => recipe.id === recipeId);

    // Check if the recipe exists
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    // Remove the recipe from the recipes array
    recipes.splice(index, 1);

    res.json({ success: true, message: 'Recipe deleted successfully' });
});

// Route for setting user's calorie plan
router.post('/set-plan', (req, res, next) => {
    const { calories } = req.body;

    if (!calories || isNaN(calories)) {
        return res.status(400).json({ success: false, message: 'Invalid or missing calories data' });
    }

    const MIN_CALORIES = 1000;
    const MAX_CALORIES = 5000;

    if (calories < MIN_CALORIES || calories > MAX_CALORIES) {
        return res.status(400).json({ success: false, message: `Calories must be between ${MIN_CALORIES} and ${MAX_CALORIES}` });
    }

    caloriePlan = calories; // сохраняем план калорий

    res.json({ success: true, message: 'Calorie plan set successfully', plan: caloriePlan });
});

// Route for getting user's calorie plan
router.get('/get-plan', (req, res, next) => {
    if (!caloriePlan) {
        return res.status(404).json({ success: false, message: 'Calorie plan not found' });
    }

    res.json({ success: true, plan: caloriePlan });
});

// Route for setting user's meal schedule
router.post('/set-schedule', (req, res, next) => {
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = req.body;

    if (!Monday || !Tuesday || !Wednesday || !Thursday || !Friday || !Saturday || !Sunday) {
        return res.status(400).json({ success: false, message: 'Missing schedule data for one or more days' });
    }

    const schedule = {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    };

    userSchedules = schedule;

    res.json({ success: true, message: 'Meal schedule set successfully' });
});

// Route for getting user's meal schedule
router.get('/get-schedule', (req, res, next) => {
    res.json({ success: true, schedule: userSchedules});
});


//(NO USE) Route for getting all recipes (optional) сейчас не нужно, может понадобиться потом, значит TO DO м
router.get('/', (req, res, next) => {
    res.json({ success: true, recipes });
});

// Error handler
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
});

// Route for getting a single recipe by ID
router.get('/:recipeId', (req, res, next) => {
    const recipeId = req.params.recipeId;

    // Find the recipe by ID
    const recipe = recipes.find(recipe => recipe.id === recipeId);

    if (!recipe) {
        return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    res.json({ success: true, recipe });
});

module.exports = router;
