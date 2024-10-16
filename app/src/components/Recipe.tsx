import React, {ReactElement, ReactNode} from 'react';
import {RecipeType, IngredientType} from "../interfaces";
import Ingredient from "./Ingredient";

const Recipe = ({recipe}: { recipe: RecipeType }): ReactElement => {
    return (
        <div className="recipe">
            <h2>{recipe.name}</h2>
            <h3>By {recipe.author.name}</h3>
            <ul className="ingredients">
                {recipe.ingredients.map((ingredient: IngredientType, index: number): ReactNode => (
                    <li key={index}>
                        <Ingredient ingredient={ingredient}/>
                    </li>
                ))}
            </ul>
            <p>{recipe.description}</p>
        </div>
    );
};

export default Recipe;
