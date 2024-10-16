import {JSX, useState, useEffect} from "react";
import axios from "axios";
import Recipe from "../../components/Recipe";
import Loading from "../../components/Loading";
import {RecipeType} from "../../interfaces";

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
        return <Loading/>;
    }

    if (error !== null) {
        return <p>Error: {error.message}</p>;
    }

    if (recipes.length === 0 && loading === false) {
        return <p>No recipes found. <a href="/recipes/create">Create one.</a></p>;
    }

    return (
        <div className={'recipe-list'}>
            {recipes.map((recipe: RecipeType) => <Recipe key={recipe.id} recipe={recipe}/>)}
        </div>
    );
}

export default RecipeList;
