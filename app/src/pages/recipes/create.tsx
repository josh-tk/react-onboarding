import React, {ReactElement, useEffect, useState} from 'react';
import {AuthorType, CreateRecipeForm, IngredientType, OptionType} from '../../interfaces';
import {CreateRecipeSchema} from "../../schemas";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import SelectInput from "../../components/Select";
import {authorToSelectOption, fromSelectOptions, toSelectOptions} from "../../formatters";
import {createRecipe} from "../../http/recipes";
import {indexIngredients} from "../../http/ingredients";
import {indexUsers} from "../../http/users";
import useHandleError from "../../http/handleError";
import {Button, Flex, FormattedText, Spinner, TextLink, useToast} from "@travelperksl/suitcase";
import styled from "styled-components";

const CreateRecipe = (): ReactElement => {
    // add types here
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [authors, setAuthors] = useState<AuthorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [requestCount, setRequestCount] = useState(0);
    const {handleError} = useHandleError();
    const addToast = useToast();

    const handleGetIngredients = (data: IngredientType[]): void => {
        setIngredients(data);
        setRequestCount((prevState) => prevState + 1);
    }

    const handleGetAuthors = (data: AuthorType[]): void => {
        setAuthors(data);
        setRequestCount((prevState) => prevState + 1);
    }

    useEffect(() => {
        if (!loading) {
            return;
        }

        indexIngredients(
            (data: IngredientType[]) => handleGetIngredients(data),
            (errorCode: number) => handleError(errorCode)
        );

        indexUsers(
            (data: AuthorType[]) => handleGetAuthors(data),
            (errorCode: number) => handleError(errorCode)
        );
    }, [loading]);

    useEffect(() => {
        // since we have two separate requests, we need to wait for both to finish
        // so keep track of them independently via counter. When it's 2, we're ready.

        // if you can think of a better way of programming this, please let me know
        // ps sorry for the setTimeout, I'm not proud of it either
        if (requestCount === 2) {
            setTimeout(() => setLoading(false), 500);
        }
    }, [requestCount]);

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

    if (loading) {
        return <Spinner type={'primary'} size={'medium'}
                        text={<FormattedText>Warping Space-Time Continuum...</FormattedText>}/>;
    }

    const CardBodySpacer = styled.div`
        padding: 24px;
        width: 50%;
    `

    const FieldSet = styled.div`
        margin: 1em 0;
    `

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

            <Flex flexDirection={'column'}>
                <TextLink to={'/recipes'}><FormattedText>Back to Recipes</FormattedText></TextLink>
                <h1><FormattedText size={'displayXL'}>Create a Recipe</FormattedText></h1>
                <CardBodySpacer>
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
                        onSubmit={(values: CreateRecipeForm): void => createRecipe(
                            values,
                            () => addToast({
                                message: 'Recipe Created',
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

                                <Button submit={true} styleType={'primary'} size={"medium"}>Create Recipe</Button>
                            </Form>
                        )}
                    </Formik>
                </CardBodySpacer>
            </Flex>
        </div>
    );
};

export default CreateRecipe;
