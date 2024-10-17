import {CreateRecipeForm, UpdateRecipeForm} from "../interfaces";
import axios from "axios";

const showRecipe = (recipe_id: string, successCallback: Function, errorCallback: Function | null) => {
    axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/${recipe_id}`)
        .then(response => {
            successCallback(response.data.recipe);
        })
        .catch(error => {
            console.error(error);
            errorCallback && errorCallback();
        });
};

const indexRecipes = (successCallback: Function, errorCallback: Function | null) => {
    axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes`)
        .then(response => {
            successCallback(response.data.recipes);
        })
        .catch(error => {
            console.error(error);
            errorCallback && errorCallback();
        });
};

const updateRecipe = (payload: UpdateRecipeForm, successCallback: Function, errorCallback: Function | null) => {
    axios.patch(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/update`, payload)
        .then(response => {
            if (response.status === 200) {
                successCallback(response.data);
            }
        })
        .catch(error => {
            console.error(error);
            errorCallback && errorCallback();
        })
};

const createRecipe = (payload: CreateRecipeForm, successCallback: Function, errorCallback: Function | null) => {
    axios.post(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/create`, payload)
        .then(response => {
            if (response.status === 201) {
                successCallback();
            }
        })
        .catch(error => {
            console.error(error);
            errorCallback && errorCallback();
        })
};

export {showRecipe, indexRecipes, createRecipe, updateRecipe};