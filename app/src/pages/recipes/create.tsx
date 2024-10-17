import React, {ReactElement, useEffect, useState} from 'react';
import {AuthorType, CreateRecipeForm, IngredientType, OptionType} from '../../interfaces';
import {CreateRecipeSchema} from "../../schemas";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import SelectInput from "../../components/Select";
import axios from "axios";
import Loading from "../../components/Loading";
import {authorToSelectOption, fromSelectOptions, toSelectOptions} from "../../formatters";

const CreateRecipe = (): ReactElement => {
    // add types here
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [authors, setAuthors] = useState<AuthorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [greatSuccess, setGreatSuccess] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/ingredients/list`)
            .then(response => {
                setIngredients(response.data.ingredients)
            }).catch(error => {
            console.error(error)
        });

        axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/users/list`)
            .then(response => {
                setAuthors(response.data.users)
            })
            .catch(error => {
                console.error(error)
            })
    }, []);

    //todo: check if theres no error and null check instead of length check
    useEffect(() => {
        if (ingredients.length > 0 && authors.length > 0) {
            setLoading(false);
        }
    }, [ingredients, authors]);

    const handleSelectAuthor = (setFieldValue: Function, selectedOption: OptionType): void => {
        // ensure Formik knows that we've selected an author in our custom select component
        setFieldValue('author_id', selectedOption.value);
    };

    const handleSelectIngredient = (setFieldValue: Function, selectedOptions: OptionType[]): void => {
        // remap the keys since our select component expects a specific shape different to our API payload
        let selectedIngredients = fromSelectOptions(selectedOptions);

        // ensure Formik knows that we've selected a couple options in our custom select component
        setFieldValue('ingredients', selectedIngredients);
    };

    const handleCreateRecipe = (formValues: CreateRecipeForm): void => {
        axios.post(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/create`, formValues)
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

    /**
     * Quick note on Formik:
     * Offloads most of the pain of form handling to the library.
     * It stores form state via formik.values
     * For the select component I've had to 'step out' of formik because it's multi-select
     * isn't great.
     * Use the CreateRecipeSchema to validate the form.
     * If the form doesn't submit, it's bc values from onSubmit do not match the Schema.
     */

    return (
        <div>
            <h1>Create Recipe</h1>

            {/*
                    while formik is great at supporting validation schemas
                    it doesn't directly support Interfaces. We'll use the yup object
                    directly here, and the interface which extends yup everywhere else.
                */}
            <Formik
                initialValues={{
                    name: '',
                    ingredients: [],
                    author_id: ''
                }}
                validationSchema={CreateRecipeSchema}
                onSubmit={(values) => handleCreateRecipe(values)}
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
                                options={toSelectOptions(ingredients)}
                                label={'Ingredients'}
                                inputName={'ingredients'}
                                isMulti={true}
                                selectedOption={toSelectOptions(formik.values.ingredients)}
                                setSelectedOption={
                                    (selectedOptions: OptionType[]) => handleSelectIngredient(formik.setFieldValue, selectedOptions)
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="ingredients">Author</label>
                            <SelectInput
                                options={toSelectOptions(authors)}
                                label={'Author'}
                                inputName={'author'}
                                selectedOption={authorToSelectOption(formik.values.author_id, authors)}
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

export default CreateRecipe;
