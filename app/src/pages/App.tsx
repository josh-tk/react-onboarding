import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import RecipeList from './recipes/index';
import CreateRecipe from './recipes/create';
import UpdateRecipe from './recipes/update';
import ResourceNotFound from './resourceNotFound';
import {Banner, FormattedText, ToastsContainer} from "@travelperksl/suitcase";
import {errors, fun} from "../lang";

const App: React.FC = (): ReactElement => {
    return (
        <Router>
            <ToastsContainer>
                <Banner
                    colorScheme="decorative1"
                    text={<FormattedText>{fun.uglyUIAlert.defaultMessage}</FormattedText>}
                />

                <Switch>
                    {/* Redirect root path to /recipes */}
                    <Route exact path="/">
                        <Redirect to="/recipes"/>
                    </Route>

                    {/* Define your routes */}
                    <Route exact path="/recipes" component={RecipeList}/>
                    <Route exact path="/recipes/create" component={CreateRecipe}/>
                    <Route exact path="/recipes/update/:id" component={UpdateRecipe}/>

                    {/* Error pages */}
                    <Route exact path="/error"
                           render={() => <h1>{errors.generic.defaultMessage}</h1>}/>

                    {/* 404 Not Found route, must be last */}
                    <Route exact path="/404" component={ResourceNotFound}/>

                    {/* Catch-all route for undefined paths */}
                    <Route component={ResourceNotFound}/>
                </Switch>
            </ToastsContainer>
        </Router>
    );
};

export default App;
