import React, {ReactElement, useEffect, useState} from 'react';
import {AuthorType, IngredientType, OptionType, ShowRecipeType, UpdateRecipeForm} from '../../interfaces';
import {UpdateRecipeSchema} from "../../schemas";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import SelectInput from "../../components/Select";
import {authorToSelectOption, toSelectOptions} from "../../formatters";
import {showRecipe, updateRecipe} from "../../http/recipes";
import useHandleError from "../../http/handleError";
import {indexIngredients} from "../../http/ingredients";
import {indexUsers} from "../../http/users";
import {Button, Flex, FormattedText, Spinner, TextLink, useToast} from '@travelperksl/suitcase'
import styled from "styled-components";

const UpdateRecipe = ({match}): ReactElement => {
    const [selectedRecipe, setSelectedRecipe] = useState<ShowRecipeType>(null);
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [authors, setAuthors] = useState<AuthorType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [requestCount, setRequestCount] = useState<number>(0);
    const addToast = useToast();
    const {handleError} = useHandleError();

    const handleSuccessfulRequest = (setState: Function, data: ShowRecipeType | IngredientType[] | AuthorType[]): void => {
        setRequestCount((prevState) => prevState + 1);
        setState(data);
    }

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
            (data: ShowRecipeType) => handleSuccessfulRequest(setSelectedRecipe, data),
            (errorCode: number) => handleError(errorCode)
        );

        indexIngredients(
            (data: IngredientType[]) => handleSuccessfulRequest(setIngredients, data),
            (errorCode: number) => handleError(errorCode)
        );

        indexUsers(
            (data: AuthorType[]) => handleSuccessfulRequest(setAuthors, data),
            (errorCode: number) => handleError(errorCode)
        )
    }, [loading]);

    useEffect(() => {
        // ps sorry for the setTimeout, I'm not proud of it either
        if (requestCount === 3) {
            setTimeout(() => setLoading(false), 500);
        }
    }, [requestCount]);

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
        return <Spinner type={'primary'} size={'medium'}
                        text={<FormattedText>Gasting Flabbers...</FormattedText>}/>;
    }

    const CardBodySpacer = styled.div`
        padding: 24px;
        width: 50%;
    `

    const FieldSet = styled.div`
        margin: 1em 0;
    `

    return (
        <div>

            <Flex flexDirection={'column'}>
                <TextLink to={'/recipes'}><FormattedText>Back to Recipes</FormattedText></TextLink>
                <h1><FormattedText size={'displayXL'}>Update Recipe</FormattedText></h1>
                <CardBodySpacer>

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
                            () => addToast({
                                message: 'Recipe Updated',
                                variant: 'dismissable',
                            }),
                            () => console.error('error')
                        )}
                    >
                        {(formik) => (
                            <Form>
                                <FieldSet>
                                    <label htmlFor="name">Title</label>
                                    <Field id="name" name="name" placeholder="Title"/>
                                    <ErrorMessage name="name" component="div"/>
                                </FieldSet>

                                <FieldSet>
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
                                </FieldSet>

                                <FieldSet>
                                    <SelectInput
                                        options={toSelectOptions(authors)}
                                        label={'Author'}
                                        inputName={'author'}
                                        selectedOption={authorToSelectOption(formik.values.author_id, authors)}
                                        setSelectedOption={
                                            (selectedOption: OptionType) => handleSelectAuthor(formik.setFieldValue, selectedOption)
                                        }
                                    />
                                </FieldSet>

                                <Button submit={true} styleType={'primary'} size={"medium"}>Update Recipe</Button>
                            </Form>
                        )}
                    </Formik>
                </CardBodySpacer>
            </Flex>
        </div>
    );
};

export default UpdateRecipe;
