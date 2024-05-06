import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComponentsCSS/Plan.css';

const Plan = () => {
    const [caloriePlan, setCaloriePlan] = useState(null);
    const [calories, setCalories] = useState('');
    const [savedCalories, setSavedCalories] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCaloriePlan();
    }, []);

    const fetchCaloriePlan = () => {
        axios.get('http://localhost:3000/api/recipes/get-plan')
            .then(res => {
                setCaloriePlan(res.data.plan);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        setCalories(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/recipes/set-plan', { calories })
            .then(res => {
                setCaloriePlan(res.data.plan);
                setSavedCalories(calories);
            })
            .catch(err => {
                setError(err.response.data.message);
            });
    };

    return (
        <div className="plan">
            <h2>Calorie Plan</h2>
            {error && <p className="error">{error}</p>}
            {caloriePlan ? (
                <p className="calorie-info">Your daily calorie plan is <span>{caloriePlan}</span> calories.</p>
            ) : (
                <p>Loading...</p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="calorie-input">
                    <label>Set daily calories:</label>
                    <input type="text" value={calories} onChange={handleChange}/>
                    <button type="submit">Save</button>
                </div>
                {savedCalories && <p className="success">Successfully saved plan: {savedCalories} calories</p>}
            </form>
        </div>
    );
};

export default Plan;




