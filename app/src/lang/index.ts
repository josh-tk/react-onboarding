import {defineMessages} from "react-intl.macro";

const responses = defineMessages({
    recipeDeletedSuccess: {
        id: 'recipe.deleted.success',
        defaultMessage: 'Recipe deleted successfully',
    },
    recipeDeletedError: {
        id: 'recipe.deleted.error',
        defaultMessage: 'Failed to delete recipe, try again?',
    },
    recipeCreatedSuccess: {
        id: 'recipe.created.success',
        defaultMessage: 'Recipe created successfully',
    },
    recipeCreatedError: {
        id: 'recipe.created.error',
        defaultMessage: 'Failed to create recipe, try again?',
    },
    recipesNotFound: {
        id: 'recipes.notFound',
        defaultMessage: 'No recipes found',
    },
    recipeUpdatedSuccess: {
        id: 'recipe.updated.success',
        defaultMessage: 'Recipe updated successfully',
    },
    recipeUpdatedError: {
        id: 'recipe.updated.error',
        defaultMessage: 'Failed to update recipe, try again?',
    },
});

const links = defineMessages({
    backToList: {
        id: 'backToList',
        defaultMessage: 'Back to list',
    },
    create: {
        id: 'create',
        defaultMessage: 'Create a recipe',
    },
});

const actions = defineMessages({
    delete: {
        id: 'delete',
        defaultMessage: 'Delete',
    },
    edit: {
        id: 'edit',
        defaultMessage: 'Edit',
    },
    create: {
        id: 'action.create',
        defaultMessage: 'Create',
    },
    createTitle: {
        id: 'action.create.title',
        defaultMessage: 'Create a recipe',
    },
    editTitle: {
        id: 'action.edit.title',
        defaultMessage: 'Edit a recipe',
    },
});

const form = defineMessages({
    title: {
        id: 'createForm.title',
        defaultMessage: 'Title',
    },
    ingredients: {
        id: 'createForm.ingredients',
        defaultMessage: 'Ingredients',
    },
    author: {
        id: 'createForm.author',
        defaultMessage: 'Author',
    },
});

const errors = defineMessages({
    generic: {
        id: 'error.generic',
        defaultMessage: 'An error occurred',
    },
    notFound: {
        id: 'error.notFound',
        defaultMessage: 'Not found',
    },
});

// just being a silly little goose, fuggedaboudit
const fun = defineMessages({
    uglyUIAlert: {
        id: 'uglyUIAlert',
        defaultMessage: 'Heads up: a backend engineer wrote this, so forgive the UI plz',
    },
    loadingOne: {
        id: 'loadingOne',
        defaultMessage: 'Brewing coffee...',
    },
    loadingTwo: {
        id: 'loadingTwo',
        defaultMessage: 'Hiring interns...',
    },
    loadingThree: {
        id: 'loadingThree',
        defaultMessage: 'BRB, napping...',
    },
});


export {responses, form, links, actions, fun, errors};
