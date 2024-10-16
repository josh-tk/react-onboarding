// src/App.tsx
import React, {ReactElement} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from "./recipes/index";

const App: React.FC = (): ReactElement => {
    return (
        <Router>
            <Routes>
                {/*<Route path="/" element={<Home />} />*/}
                <Route path="/recipes" element={<RecipeList />}></Route>
            </Routes>
        </Router>
    );
};

export default App;