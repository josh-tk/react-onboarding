import React, {ReactElement, ReactNode} from 'react';
import {IngredientType, ShowRecipeType} from "../interfaces";
import Ingredient from "./Ingredient";

const Recipe = ({recipe}: { recipe: ShowRecipeType }): ReactElement => {
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
            <a href={`/recipes/update/${recipe.id}`}>Edit</a>
        </div>
    );
};

export default Recipe;
