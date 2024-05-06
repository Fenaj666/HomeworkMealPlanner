import React, { useState, useEffect } from 'react';
import RecipeList from '../RecipeList';
import axios from 'axios';

const MyRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        axios.get('http://localhost:3000/api/recipes/my-recipes')
            .then(res => {
                setRecipes(res.data.recipes);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1>My Recipes</h1>
            <RecipeList recipes={recipes} />
        </div>
    );
}

export default MyRecipesPage;



