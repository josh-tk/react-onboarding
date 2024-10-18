import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import Recipe from "../../components/Recipe";
import {ShowRecipeType} from "../../interfaces";
import {FormattedText, Spinner} from "@travelperksl/suitcase";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {errors, fun, links, responses} from "../../lang";

const RecipeList = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const route = `${process.env.REACT_APP_BACKEND_API_HOST}/recipes`;

        axios.get(route)
            .then((response) => {
                setRecipes(response.data.recipes);
                setLoading(false);
            }).catch((error) => {
            console.error(error);
            setError(error);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <Spinner
            type={'primary'}
            size={'medium'}
            text={<FormattedText>{fun.loadingTwo.defaultMessage}</FormattedText>}
        />;
    }

    if (error !== null) {
        return <p>{errors.generic.defaultMessage}: {error.message}</p>;
    }

    if (recipes.length === 0 && loading === false) {
        return (
            <p>{
                responses.recipesNotFound.defaultMessage}
                <a href="/recipes/create">
                    <FormattedText>
                        {links.create.defaultMessage}
                    </FormattedText>
                </a>
            </p>
        );
    }

    const Column = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1em;
    `;

    return (
        <Column>
            <Link to={'/recipes/create'}>
                <FormattedText>
                    {links.create.defaultMessage}
                </FormattedText>
            </Link>

            {recipes.map((recipe: ShowRecipeType) => <Recipe key={recipe.id} recipe={recipe}/>)}
        </Column>
    );
}

export default RecipeList;
