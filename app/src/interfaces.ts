import {InferType as Schema} from "yup";
import {CreateRecipeSchema, IdentifierSchema, ShowRecipeSchema, UpdateRecipeSchema} from "./schemas";

/**
 * Interfaces
 * Types that are used in the application.
 * They are built from Yup objects. See schemas.js.
 *
 */

/**
 * @see ShowRecipeSchema
 * @property {string} id
 * @property {string} name
 * @property {IdentifierSchema[]} ingredients
 * @property {IdentifierSchema} author
 */
interface ShowRecipeType extends Schema<typeof ShowRecipeSchema> {
}

/**
 * @see CreateRecipeSchema
 * @param {string} id - unique identifier
 * @param {string} name - name of the recipe
 * @param {IdentifierSchema[]} ingredients - list of ingredients
 * @param {string} author_id - unique identifier of the author
 */
interface CreateRecipeType extends Schema<typeof CreateRecipeSchema> {
}

/**
 * @see UpdateRecipeSchema
 * @param {string} id - unique identifier
 * @param {string} name - name of the recipe
 * @param {IdentifierSchema[]} ingredients - list of ingredients
 * @param {string} author_id - unique identifier of the author
 */
interface UpdateRecipeType extends Schema<typeof UpdateRecipeSchema> {
}

/**
 * @see IdentifierSchema
 * @param {string} id - unique identifier
 * @param {string} name - name of the ingredient
 */
interface IngredientType extends Schema<typeof IdentifierSchema> {
}

/**
 * Generic type for an identifier.
 * @see IdentifierSchema
 * @param {string} id - unique identifier
 * @param {string} name - name of the ingredient
 */
interface IdentifierType extends Schema<typeof IdentifierSchema> {
}

/**
 * Used in the SelectInput component.
 * @property {string} value - value of the option
 * @property {string} label - label of the option
 *
 * Maps from the IngredientType interface (value = id, label = name)
 */
interface OptionType {
    value: string;
    label: string;
}

/**
 * @see IdentifierSchema
 * @param {string} id - unique identifier
 * @param {string} name - name of the author
 */
interface AuthorType extends Schema<typeof IdentifierSchema> {
}

/**
 * Defines the actual shape of the form state
 * Can't use the CreateRecipeType interface here because Formik doesn't support interfaces
 * as initial values.
 */
interface CreateRecipeForm {
    name: string;
    ingredients: IdentifierType[];
    author_id: string;
}

/**
 * Based on the CreateRecipeForm interface, but includes the id field.
 * @see CreateRecipeForm
 */
interface UpdateRecipeForm extends CreateRecipeForm {
    id: string;
}

export type {
    ShowRecipeType,
    CreateRecipeType,
    UpdateRecipeType,
    IngredientType,
    IdentifierType,
    OptionType,
    AuthorType,
    CreateRecipeForm,
    UpdateRecipeForm
};