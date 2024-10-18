import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import RecipeList from './recipes/index';
import CreateRecipe from './recipes/create';
import UpdateRecipe from './recipes/update';
import ResourceNotFound from './resourceNotFound';
import {Banner, FormattedText, ToastsContainer} from "@travelperksl/suitcase";

const App: React.FC = (): ReactElement => {
    return (
        <Router>
            <Switch>
                <ToastsContainer>
                    <Banner
                        colorScheme="decorative1"
                        text={<FormattedText>Warning: This app is hella ugly</FormattedText>}
                    />

                    {/* for this app, root route is /recipes, not / (didn't want to create a home page)*/}
                    <Route exact path="/">
                        <Redirect to="/recipes"/>
                    </Route>

                    <Route exact path="/recipes" component={RecipeList}/>
                    <Route exact path="/recipes/create" component={CreateRecipe}/>
                    <Route exact path="/recipes/update/:id" component={UpdateRecipe}/>
                </ToastsContainer>

                {/* Error pages */}
                <Route exact path='/error'
                       render={() => <h1>Something went wrong. Maybe try refreshing the page</h1>}/>
                <Route component={ResourceNotFound}/>
            </Switch>
        </Router>
    );
};

export default App;
