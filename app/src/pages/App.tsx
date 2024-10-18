import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RecipeList from './recipes/index';
import CreateRecipe from './recipes/create';
import UpdateRecipe from './recipes/update';
import ResourceNotFound from './resourceNotFound';

const App: React.FC = (): ReactElement => {
    return (
        <Router>
            <Switch>
                <Route exact path="/recipes" component={RecipeList}/>
                <Route exact path="/recipes/create" component={CreateRecipe}/>
                <Route exact path="/recipes/update/:id" component={UpdateRecipe}/>

                {/* Error pages */}
                <Route exact path='/error' render={() => <h1>Something went wrong. Maybe try refreshing the page</h1>}/>
                <Route component={ResourceNotFound}/>
            </Switch>
        </Router>
    );
};

export default App;
