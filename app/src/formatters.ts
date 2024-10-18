import {AuthorType, IngredientType, OptionType} from "./interfaces";

const authorToSelectOption = (author_id: string, allAuthors: AuthorType[]): OptionType | null => {
    const selectedAuthor = allAuthors.find(author => author.id === author_id);

    if (typeof selectedAuthor === 'undefined') {
        return null;
    }

    return {
        value: selectedAuthor.id,
        label: selectedAuthor.name
    };
}

const toSelectOptions = (resourceList: AuthorType[] | IngredientType[]): OptionType[] => {
    return resourceList.map((resource: AuthorType | IngredientType) => {
        return {
            value: resource.id,
            label: resource.name
        };
    });
};

const fromSelectOptions = (optionList: OptionType[]): AuthorType[] | IngredientType[] => {
    return optionList.map((option: OptionType) => {
        return {
            id: option.value,
            name: option.label
        };
    });
};

export {authorToSelectOption, toSelectOptions, fromSelectOptions};