import React, { useState } from 'react';
import axios from 'axios';
import './ComponentsCSS/AddRecipeForm.css';


const AddRecipeForm = () => {
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        ingredients: '',
        calories: '',
        instructions: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = e => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('ingredients', formData.ingredients);
        formDataToSend.append('calories', formData.calories);
        formDataToSend.append('instructions', formData.instructions);

        axios.post('http://localhost:3000/api/recipes/create', formDataToSend)
            .then(response => {
                console.log('Recipe added:', response.data);
                // Clear form fields
                setFormData({
                    image: '',
                    name: '',
                    ingredients: '',
                    calories: '',
                    instructions: ''
                });
            })
            .catch(error => {
                console.error('Error adding recipe:', error);
            });
    };

    return (
        <div className="add-recipe-form">
            <h2>Add Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="image-upload" className="custom-file-upload">
                    <input type="file" id="image-upload" name="image" onChange={handleImageChange} accept="image/*" />
                    Upload Image
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" />
                <input type="text" name="calories" value={formData.calories} onChange={handleChange} placeholder="Calories" />
                <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Instructions"></textarea>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipeForm;
