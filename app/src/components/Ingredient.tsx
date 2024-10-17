import React from 'react';
import {IngredientType} from "../interfaces";

const Ingredient = ({ingredient}: { ingredient: IngredientType }) => {
    return (
        <div className="ingredient">
            <h3>{ingredient.name}</h3>
        </div>
    );
}

export default Ingredient;
