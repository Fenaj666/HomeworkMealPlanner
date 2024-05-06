//Уже не нужно, но оставлю на будущее для структуры проекта

/*
const { Recipe } = require('../models/recipe');

class RecipeController {
    async createRecipe(req, res) {
    console.log(req.body);

        const { image, name, ingredients, calories, instructions } = req.body;

        // Create a new recipe
        const newRecipe = new Recipe({
            image,
            name,
            ingredients,
            calories,
            instructions,
        });

        // Save recipe to database
        await newRecipe.save();

        // Send a response to the client
        res.json({ success: true });
    }
}

module.exports = {
    recipeController: new RecipeController(),
};
 */


/*
const Recipe = require('../models/recipe');

class RecipeController {
    async createRecipe(req, res) {
        console.log(req.body);

        const { image, name, ingredients, calories, instructions } = req.body;

        // проверка  обязательных полей  || заюзать позже
        if (!image || !name || !ingredients || !calories || !instructions) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        try {
            // Создаю рецепт          || чот не работает, попробую это запихнуть в роут
            const newRecipe = new Recipe({
                image,
                name,
                ingredients,
                calories,
                instructions,
            });

            // сейвлю рецепт в базе
            const savedRecipe = await newRecipe.save();


            // кидаю ответ клиенту
            res.status(201).json({ success: true, recipe: savedRecipe });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
}
module.exports = RecipeController;
*/
/*
module.exports = {
    recipeController: new RecipeController()
};
*/
