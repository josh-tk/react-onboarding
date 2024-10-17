import React, {ReactElement, ReactNode} from 'react';
import {IngredientType, ShowRecipeType} from "../interfaces";
import Ingredient from "./Ingredient";
import axios from "axios";

const Recipe = ({recipe}: { recipe: ShowRecipeType }): ReactElement => {
    const handleDelete = (id: string): void => {
        axios.delete(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/${id}`)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
            console.error(error);
        });
    };

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
            <button type={'button'} onClick={(): void => handleDelete(recipe.id)}>Delete</button>
        </div>
    );
};

export default Recipe;