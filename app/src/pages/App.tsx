import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RecipeList from "./recipes/index";
import CreateRecipe from "./recipes/create";
import UpdateRecipe from "./recipes/update";
import ResourceNotFound from "./resourceNotFound";

const App: React.FC = (): ReactElement => {
    return (
        <Router>
            <Routes>
                <Route path="/recipes" element={<RecipeList/>}></Route>
                <Route path="/recipes/create" element={<CreateRecipe/>}></Route>
                <Route path="/recipes/update/:id" element={<UpdateRecipe/>}></Route>

                <Route path='/error' element={<h1>Something went wrong. Maybe try refreshing the page</h1>}/>
                <Route path="*" element={<ResourceNotFound/>}/>
            </Routes>
        </Router>
    );
};

export default App;
