import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './ComponentsCSS/Basket.css';

const Basket = ({ addToBasket }) => {
    const [basket, setBasket] = useState([]);
    const [ingredientName, setIngredientName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBasket();
    }, []);

    const fetchBasket = () => {
        axios.get('http://localhost:3000/api/recipes/get-basket')
            .then(res => {
                setBasket(res.data.basket);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleAddToBasket = () => {
        if (!ingredientName.trim()) {
            setError('Please enter an ingredient name');
            return;
        }

        const ingredient = { id: uuidv4(), name: ingredientName }; // Генерируем id здесь
        axios.post('http://localhost:3000/api/recipes/add-to-basket', { ingredient })
            .then(res => {
                setIngredientName('');
                setError('');
                fetchBasket();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleRemoveFromBasket = (id) => {
        axios.delete(`http://localhost:3000/api/recipes/remove-from-basket/${id}`)
            .then(res => {
                fetchBasket();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleMarkAsPurchased = (id) => {
        axios.put(`http://localhost:3000/api/recipes/mark-as-purchased/${id}`)
            .then(res => {
                fetchBasket();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="basket-container">
            <h2>Shopping Basket</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="add-ingredient">
                <input type="text" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} placeholder="Enter ingredient" />
                <button className="add-button" onClick={handleAddToBasket}>Add</button>
            </div>
            <ul className="basket-list">
                {basket.map(ingredient => (
                    <li key={ingredient.id} className={`basket-item ${ingredient.purchased ? 'purchased' : ''}`}>
                        <span>{ingredient.name}</span>
                        <button className="remove-button" onClick={() => handleRemoveFromBasket(ingredient.id)}>Remove</button>
                        {!ingredient.purchased && <button className="purchase-button" onClick={() => handleMarkAsPurchased(ingredient.id)}>Mark as Purchased</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Basket;







