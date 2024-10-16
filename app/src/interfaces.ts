import {BaseRecipeSchema, IdentifierSchema, RecipeSchema} from "./schemas";
import {InferType as Schema} from "yup";

/**
 * Interfaces
 * BaseRecipeType: used for the initial values of any forms and creation of records
 * RecipeType: used for everything else (displaying, updating, deleting etc)
 * OptionType: used for select dropdowns, this is the shape of each option
 *
 * Both IngredientType and AuthorType are essentially the same as IdentifierType, but we're keeping them separate
 * for semantics. They could easily be decoupled if needed
 *
 * We leverage Yup's `InferType` so we can essentially have an interface with validation.
 * Docs: https://github.com/jquense/yup?tab=readme-ov-file#typescript-integration
 * See the `schemas.ts` file for the actual property definitions.
 */

interface IngredientType extends Schema<typeof IdentifierSchema> {
}

interface AuthorType extends Schema<typeof IdentifierSchema> {
}

interface BaseRecipeType extends Schema<typeof BaseRecipeSchema> {
}

interface RecipeType extends Schema<typeof RecipeSchema> {
}

interface OptionType {
    value: string;
    label: string;
}

export type {BaseRecipeType, RecipeType, IngredientType, AuthorType, OptionType};
