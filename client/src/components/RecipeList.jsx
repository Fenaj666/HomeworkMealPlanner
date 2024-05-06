import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ComponentsCSS/RecipeList.css';

const RecipeList = () => {
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

    const handleRefresh = () => {
        fetchRecipes();
    };

    return (
        <div className="recipe-list-container">
            <h2 className="recipe-list-title">My Recipes</h2>
            <div className="recipe-list">
                {recipes.map(recipe => (
                    <Link to={`/recipe/${recipe.id}`} className="recipe-card" key={recipe.id}>
                        <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.name} className="recipe-image" />
                        <div className="recipe-info">
                            <h3 className="recipe-name">{recipe.name}</h3>
                            <p className="recipe-description">{recipe.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <button className="refresh-button" onClick={handleRefresh}>Refresh Recipes</button>
        </div>
    );
}

export default RecipeList;





