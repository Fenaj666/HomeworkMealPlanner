import React from 'react';
import AddRecipeForm from '../AddRecipeForm';
import './AddRecipePage.css'

const AddRecipePage = () => {
    return (
        <div className="add-recipe-page">
            <div className="add-recipe-container">
                <h1 className="page-title">Add New Recipe</h1>
                <AddRecipeForm />
            </div>
        </div>
    );
}

export default AddRecipePage;
