import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom';
import Menu from './components/Menu';
import Basket from './components/Basket';
import RecipeList from './components/RecipeList';
import AddRecipePage from './components/pages/AddRecipePage';
import PlanSchedule from './components/PlanSchedule';
import RecipePage from './components/pages/RecipePage';
import Plan from './components/Plan';
import './index.css';

function App() {
    const [showBasket, setShowBasket] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        // Setting the current path when loading an application
        setCurrentPath(window.location.pathname);
        // Checking the path every time the URL changes
        window.onpopstate = () => {
            setCurrentPath(window.location.pathname);
        };
    }, []);

    useEffect(() => {
        // Проверяем текущий путь
        setShowLogo(currentPath === '/');
    }, [currentPath]);

    const toggleBasket = () => {
        setShowBasket(!showBasket);
    };


    return (
        <Router>
            <div className="App">
                <Menu />
                <div className="content">
                    <Routes>
                        <Route path="/my-recipes" element={<RecipeList />} />
                        <Route path="/add-recipe" element={<AddRecipePage />} />
                        <Route path="/schedule" element={<PlanSchedule />} />
                        <Route path="/plan" element={<Plan />} />
                        <Route path="/recipe/:id" element={<RecipePage />} />
                    </Routes>
                </div>
                <button onClick={toggleBasket}>Basket</button>
                {showBasket && <Basket />}
              <Footer />
            </div>
        </Router>
    );
}

function Footer() {
    const location = useLocation();

    return (
        <footer className="footer">
            {location.pathname === '/' && (
                <img src="/MealPlannerlogo.png" alt="Logo" className="footer-logo" />
            )}
        </footer>
    );
}
export default App;











