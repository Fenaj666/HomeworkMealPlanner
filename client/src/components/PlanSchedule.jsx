import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComponentsCSS/PlanSchedule.css'

const PlanSchedule = () => {
    const [schedule, setSchedule] = useState({
        Monday: { breakfast: "", lunch: "", dinner: "" },
        Tuesday: { breakfast: "", lunch: "", dinner: "" },
        Wednesday: { breakfast: "", lunch: "", dinner: "" },
        Thursday: { breakfast: "", lunch: "", dinner: "" },
        Friday: { breakfast: "", lunch: "", dinner: "" },
        Saturday: { breakfast: "", lunch: "", dinner: "" },
        Sunday: { breakfast: "", lunch: "", dinner: "" }
    });
    const [savedSchedule, setSavedSchedule] = useState({
        Monday: { breakfast: "", lunch: "", dinner: "" },
        Tuesday: { breakfast: "", lunch: "", dinner: "" },
        Wednesday: { breakfast: "", lunch: "", dinner: "" },
        Thursday: { breakfast: "", lunch: "", dinner: "" },
        Friday: { breakfast: "", lunch: "", dinner: "" },
        Saturday: { breakfast: "", lunch: "", dinner: "" },
        Sunday: { breakfast: "", lunch: "", dinner: "" }
    });
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = () => {
        const savedScheduleData = JSON.parse(localStorage.getItem('savedSchedule'));
        if (savedScheduleData) {
            setSavedSchedule(savedScheduleData);
            setShowForm(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [day, time] = name.split('-');
        setSchedule(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [time]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/recipes/set-schedule', schedule)
            .then(res => {
                console.log(res.data.message);
                setSavedSchedule(schedule);
                localStorage.setItem('savedSchedule', JSON.stringify(schedule));
                setShowForm(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    return (
        <div className="plan-schedule">
            <h2>Plan Schedule</h2>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div className="schedule-container">
                        {Object.keys(schedule).map(day => (
                            <div key={day} className="schedule-day">
                                <h3>{day}</h3>
                                <div className="schedule-meal">
                                    <div className="meal-input">
                                        <label>Breakfast:</label>
                                        <input type="text" name={`${day}-breakfast`} value={schedule[day].breakfast} onChange={handleChange} />
                                    </div>
                                    <div className="meal-input">
                                        <label>Lunch:</label>
                                        <input type="text" name={`${day}-lunch`} value={schedule[day].lunch} onChange={handleChange} />
                                    </div>
                                    <div className="meal-input">
                                        <label>Dinner:</label>
                                        <input type="text" name={`${day}-dinner`} value={schedule[day].dinner} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit">Save Schedule</button>
                </form>
            )}
            {!showForm && (
                <div className="saved-schedule">
                    <h3>Saved Schedule</h3>
                    {Object.keys(savedSchedule).map(day => (
                        <div key={day} className="saved-day">
                            <h4>{day}</h4>
                            <ul>
                                <li><strong>Breakfast:</strong> {savedSchedule[day].breakfast}</li>
                                <li><strong>Lunch:</strong> {savedSchedule[day].lunch}</li>
                                <li><strong>Dinner:</strong> {savedSchedule[day].dinner}</li>
                            </ul>
                        </div>
                    ))}
                    <button onClick={handleShowForm}>Create New Schedule</button>
                </div>
            )}
        </div>
    );
}

export default PlanSchedule;




