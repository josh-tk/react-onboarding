interface Base
{
    id: string;
    name: string;
}

interface IngredientType extends Base {}

interface AuthorType extends Base {}

interface RecipeType extends Base
{
    description: string;
    ingredients: IngredientType[];
    author: AuthorType;
}

export type { RecipeType, IngredientType, AuthorType };
