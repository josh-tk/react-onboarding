import React, {useEffect, useState} from 'react';
import {OptionType} from '../../interfaces';
import {UpdateRecipeSchema} from "../../schemas";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import SelectInput from "../../components/Select";
import axios from "axios";
import Loading from "../../components/Loading";

const UpdateRecipe = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [greatSuccess, setGreatSuccess] = useState(false);

    useEffect(() => {
        const recipeId = window.location.pathname.split('/').pop();

        // todo: client side 404 page
        if (recipeId === null) {
            return;
        }

        axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/${recipeId}`)
            .then(response => {
                console.log('data -> ', response.data);
                setSelectedRecipe(response.data);
            }).catch(error => {
            if (error.response.status === 404) {
                console.error('Recipe not found');
            }
        });

        axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/ingredients/list`)
            .then(response => {
                setIngredients(formatForSelect(response.data.ingredients));
            }).catch(error => {
            console.error(error);
        });

        axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/users/list`)
            .then(response => {
                setAuthors(formatForSelect(response.data.users));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (selectedRecipe !== null && loading) {
            setLoading(false);
        }
    }, [selectedRecipe, loading]);

    const handleSelectIngredient = (setFieldValue, selectedOptions: OptionType[]) => {
        // ensure Formik knows that we've selected a couple options in our custom select component
        // remap the keys since our select component expects a specific shape different to our API payload
        let selectedIngredients = selectedOptions.map(option => {
            return {
                id: option.value,
                name: option.label
            }
        });

        setFieldValue('ingredients', selectedIngredients);
    }
    const handleSelectAuthor = (setFieldValue, selectedOption: OptionType) => {
        // ensure Formik knows that we've selected an author in our custom select component
        setFieldValue('author_id', selectedOption.value);
    }

    const formatForSelect = (data: any) => {
        return data.map(resource => {
            return {
                value: resource.id,
                label: resource.name
            }
        })
    }

    const formatAuthorForSelect = (author_id) => {
        return authors.find(author => author.value === author_id);
    }

    const handleUpdateRecipe = (values) => {
        axios.post(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/update`, values)
            .then(response => {
                if (response.status === 201) {
                    setGreatSuccess(true);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    if (loading) {
        return <Loading/>;
    }

    if (greatSuccess) {
        return <p>Great success! <a href="/recipes">View your recipes</a>. High Five!</p>;
    }

    return (
        <div>
            <h1>Update Recipe</h1>

            {/*
                while formik is great at supporting validation schemas
                it doesn't directly support Interfaces. We'll use the yup object
                directly here, and the interface which extends yup everywhere else.
            */}
            <Formik
                initialValues={{
                    id: selectedRecipe.id,
                    name: selectedRecipe.name,
                    ingredients: selectedRecipe.ingredients,
                    author_id: selectedRecipe.author.id
                }}
                validationSchema={UpdateRecipeSchema}
                onSubmit={(values) => handleUpdateRecipe(values)}
            >
                {(formik) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Title</label>
                            <Field id="name" name="name" placeholder="Title"/>
                            <ErrorMessage name="name" component="div"/>
                        </div>

                        <div>
                            <SelectInput
                                options={ingredients}
                                label={'Ingredients'}
                                inputName={'ingredients'}
                                isMulti={true}
                                selectedOption={formatForSelect(formik.values.ingredients)}
                                setSelectedOption={
                                    (selectedOptions: OptionType[]) => handleSelectIngredient(formik.setFieldValue, selectedOptions)
                                }
                            />
                        </div>

                        <div>
                            <SelectInput
                                options={authors}
                                label={'Author'}
                                inputName={'author'}
                                selectedOption={formatAuthorForSelect(formik.values.author_id)}
                                setSelectedOption={
                                    (selectedOption: OptionType) => handleSelectAuthor(formik.setFieldValue, selectedOption)
                                }
                            />
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateRecipe;
