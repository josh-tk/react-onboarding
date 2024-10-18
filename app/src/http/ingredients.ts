import axios from "axios";

const indexIngredients = (successCallback: Function, errorCallback: Function | null) => {
    axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/ingredients/list`)
        .then(response => {
            successCallback(response.data.ingredients);
        }).catch(error => {
        console.error(error);
        errorCallback && errorCallback();
    });
}

export {indexIngredients};
