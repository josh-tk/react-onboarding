import React, {ReactElement, useEffect, useState} from 'react';
import {AuthorType, IngredientType, OptionType, ShowRecipeType, UpdateRecipeForm} from '../../interfaces';
import {UpdateRecipeSchema} from "../../schemas";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import SelectInput from "../../components/Select";
import Loading from "../../components/Loading";
import {authorToSelectOption, toSelectOptions} from "../../formatters";
import {showRecipe, updateRecipe} from "../../http/recipes";
import useHandleError from "../../http/handleError";
import {indexIngredients} from "../../http/ingredients";
import {indexUsers} from "../../http/users";
import {Button} from '@travelperksl/suitcase'

const UpdateRecipe = ({match}): ReactElement => {
    const [selectedRecipe, setSelectedRecipe] = useState<ShowRecipeType>(null);
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [authors, setAuthors] = useState<AuthorType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [greatSuccess, setGreatSuccess] = useState<boolean>(false);
    const {handleError} = useHandleError();

    useEffect(() => {
        if (!loading) {
            return;
        }

        const recipeId = match.params.id;

        if (recipeId === null) {
            handleError(404);
        }

        // fetch the recipe, ingredients and authors
        // if it fails, delegate to the error handler
        // had to define the error handler here because
        // you need to use the hook in a component
        showRecipe(
            recipeId,
            (data: ShowRecipeType) => setSelectedRecipe(data),
            (errorCode: number) => handleError(errorCode)
        );

        indexIngredients(
            (data: IngredientType[]) => setIngredients(data),
            (errorCode: number) => handleError(errorCode)
        );

        indexUsers(
            (data: AuthorType[]) => setAuthors(data),
            (errorCode: number) => handleError(errorCode)
        )
    }, [loading]);

    useEffect(() => {
        if (selectedRecipe !== null && loading) {
            setLoading(false);
        }
    }, [selectedRecipe, loading]);

    const handleSelectIngredient = (setFieldValue: Function, selectedOptions: OptionType[]): void => {
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
    const handleSelectAuthor = (setFieldValue: Function, selectedOption: OptionType): void => {
        // ensure Formik knows that we've selected an author in our custom select component
        setFieldValue('author_id', selectedOption.value);
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
                onSubmit={(values: UpdateRecipeForm) => updateRecipe(
                    values,
                    () => setGreatSuccess(true),
                    () => console.error('error')
                )}
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

                        <Button submit={true} size={"small"}>Update Recipe</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateRecipe;
