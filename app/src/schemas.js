import * as yup from 'yup';

/**
 * Schemas
 * BaseRecipeSchema: schema for creating a new recipe only
 * RecipeSchema: everything else (presenting, updating, deleting)
 * IdentifierSchema: generic schema used to build Ingredient and Author objects
 *
 * These schemas will be used as the basis for the Interfaces
 * as well as client-side form validation, all in one.
 *
 * If you're not sure which to use, use RecipeSchema. Any saved record will have an ID.
 */

let IdentifierSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required()
});

let BaseRecipeSchema = yup.object({
    name: yup.string().required(),
    ingredients: yup.array().of(IdentifierSchema).required(),
    author: IdentifierSchema.required(),
});

let ShowRecipeSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    ingredients: yup.array().of(IdentifierSchema).required(),
    author: IdentifierSchema.required(),
});

let CreateRecipeSchema = yup.object({
    name: yup.string().required(),
    ingredients: yup.array().of(IdentifierSchema).required(),
    author_id: yup.string().required(),
});

let UpdateRecipeSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    ingredients: yup.array().of(IdentifierSchema).required(),
    author_id: yup.string().required(),
})

export {IdentifierSchema, ShowRecipeSchema, BaseRecipeSchema, CreateRecipeSchema, UpdateRecipeSchema};
