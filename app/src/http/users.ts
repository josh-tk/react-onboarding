import axios from "axios";

const indexUsers = (successCallback: Function, errorCallback: Function | null) => {
    axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/users/list`)
        .then(response => {
            successCallback(response.data.users);
        })
        .catch(error => {
            errorCallback && errorCallback(error.code);
        });
};

export {indexUsers};