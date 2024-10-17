import React, {useEffect, useState} from 'react';
import {OptionType} from '../../interfaces';
import {CreateRecipeSchema} from "../../schemas";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import SelectInput from "../../components/Select";
import axios from "axios";
import Loading from "../../components/Loading";

const CreateRecipe = () => {
        const [ingredients, setIngredients] = useState([]);
        const [authors, setAuthors] = useState([]);
        const [loading, setLoading] = useState(true);
        const [greatSuccess, setGreatSuccess] = useState(false);

        useEffect(() => {
            axios.get(`${process.env.REACT_APP_BACKEND_API_HOST}/ingredients/list`)
                .then(response => {
                    setIngredients(formatForSelect(response.data.ingredients))
                }).catch(error => {
                console.error(error)
            });

            axios.get(
                `${process.env.REACT_APP_BACKEND_API_HOST}/users/list`,
            )
                .then(response => {
                    setAuthors(formatForSelect(response.data.users))
                })
                .catch(error => {
                    console.error(error)
                })
        }, [])

        //todo: check if theres no error and null check instead of length check
        useEffect(() => {
            if (ingredients.length > 0 && authors.length > 0) {
                setLoading(false);
            }
        }, [ingredients, authors]);

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
            // if we've not selected an author yet, don't map anything and don't tell the select component
            // to pre-select anything
            if (author_id === null || authors.length === 0 || loading) {
                return null;
            }

            const author = authors.find(author => author.id === author_id);

            // sanity check, if we can't find the author, don't pre-select anything
            if (typeof author === 'undefined') {
                return null;
            }

            return {
                value: author.id,
                label: author.name
            }
        }

        const handleCreateRecipe = (values) => {
            console.log('submitted ->', values);
            axios.post(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/create`, values)
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
                                <label htmlFor="ingredients">Author</label>
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
    }
;

export default CreateRecipe;
