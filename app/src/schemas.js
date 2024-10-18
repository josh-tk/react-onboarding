import * as yup from 'yup';

/**
 * Schemas
 * Defined as Yup objects to validate form data
 * Also used to define the structure of objects in the app
 * See interfaces.ts for the types that these schemas represent
 *
 * I've added doc blocks to each schema so you can see the shape
 * in various contexts. This is useful for understanding the structure
 * because they're built up from smaller schemas.
 */

/**
 * IdentifierSchema
 * @param {string} id - unique identifier
 * @param {string} name - name of the object
 * @returns {object} - yup schema
 * id and name are used so often in this app that it's worth making a schema for them
 */
let IdentifierSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required()
});

/**
 * ShowRecipeSchema - Base template (not used directly)
 * @param {string} id - unique identifier
 * @param {string} name - name of the recipe
 *
 * Not used anywhere explicitly but useful for defining the structure
 */
let BaseRecipeSchema = yup.object({
    name: yup.string().required(),
    ingredients: yup.array().of(IdentifierSchema).required(),
});

/**
 * ShowRecipeSchema - Used when showing a recipe to the user
 * @param {string} id - unique identifier
 * @param {string} name - name of the recipe
 * @param {IdentifierSchema} author - author object
 */
let ShowRecipeSchema = BaseRecipeSchema.concat(
    yup.object({
        id: yup.string().required(),
        author: IdentifierSchema.required(),
    })
);

/**
 * CreateRecipeSchema - Used for creating recipes
 *
 * @param {string} name - name of the recipe
 * @param {IdentifierSchema[]} ingredients - list of ingredients
 * @param {string} author_id - unique identifier of the author
 */
let CreateRecipeSchema = BaseRecipeSchema.concat(
    yup.object({
        author_id: yup.string().required(),
    })
);

/**
 * UpdateRecipeSchema - Used for updating recipes
 * @param {string} id - unique identifier
 * @param {string} name - name of the recipe
 * @param {IdentifierSchema[]} ingredients - list of ingredients
 * @param {string} author_id - unique identifier of the author
 */
let UpdateRecipeSchema = BaseRecipeSchema.concat(
    yup.object({
        id: yup.string().required(),
        author_id: yup.string().required(),
    })
);

export {IdentifierSchema, ShowRecipeSchema, BaseRecipeSchema, CreateRecipeSchema, UpdateRecipeSchema};
