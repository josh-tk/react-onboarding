import React from 'react';
import {IngredientType} from "../interfaces";
import {FormattedText} from "@travelperksl/suitcase";

const Ingredient = ({ingredient}: { ingredient: IngredientType }) => {
    return (
        <div className="ingredient">
            <FormattedText>{ingredient.name}</FormattedText>
        </div>
    );
}

export default Ingredient;
