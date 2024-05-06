import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipePage.css';

const RecipePage = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchRecipe(id);
        }
    }, [id]);

    const fetchRecipe = (recipeId) => {
        axios.get(`http://localhost:3000/api/recipes/${recipeId}`)
            .then(res => {
                setRecipe(res.data.recipe);
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (!recipe) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="recipe-container">
            <h1 className="recipe-name">{recipe.name}</h1>
            <div className="recipe-content">
                <div className="recipe-image">
                    <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.name} />
                </div>
                <div className="recipe-details">
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Calories:</strong> {recipe.calories}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipePage;





