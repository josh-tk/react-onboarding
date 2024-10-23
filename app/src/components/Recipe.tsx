import React, {ReactElement, ReactNode} from 'react';
import {IngredientType, ShowRecipeType} from "../interfaces";
import Ingredient from "./Ingredient";
import axios from "axios";
import {Badge, Button, Card, Flex, FormattedText, useToast} from "@travelperksl/suitcase";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {actions, errors, responses} from "../lang";

const Recipe = ({recipe}: { recipe: ShowRecipeType }): ReactElement => {
    const addToast = useToast();

    const handleDelete = (id: string): void => {
        axios.delete(`${process.env.REACT_APP_BACKEND_API_HOST}/recipes/${id}`)
            .then((response) => {
                addToast({
                    message: responses.recipeDeletedSuccess.defaultMessage,
                    variant: 'dismissable',
                });

                setTimeout(() => window.location.reload(), 1000);
            }).catch((error) => {
            addToast({
                message: errors.generic.defaultMessage,
                variant: 'dismissable',
            });
        });
    };

    const List = styled.ul`
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
    `

    const ListItem = styled.div`
        list-style-type: none;
        font-family: inherit;
        margin: 1em;
    `

    const PaddedDiv = styled.div`
        padding: 2em;
    `;

    const Seperator = styled.hr`
        border: 1px solid #f0f0f0;
        margin: 1em 0;
    `;

    return (
        <>
            <Seperator/>

            <Card shadowDepth={'z3'} roundness={'borderRadiusMd'}>
                <PaddedDiv>
                    <FormattedText size={'displayM'}>{recipe.name}</FormattedText>
                    <Badge colorPalette={'neutral'} text={recipe.author.name}/>
                    <List>
                        {recipe.ingredients.map((ingredient: IngredientType, index: number): ReactNode => (
                            <ListItem key={index}>
                                <Ingredient ingredient={ingredient}/>
                            </ListItem>
                        ))}
                    </List>

                    <Flex alignItems={'center'} alignContent={'space-between'}>
                        <Link to={`/recipes/update/${recipe.id}`}>
                            <FormattedText>
                                {actions.edit.defaultMessage}
                            </FormattedText>
                        </Link>
                        <Button styleType={'danger'} onClick={(): void => handleDelete(recipe.id)}>
                            <FormattedText>
                                {actions.delete.defaultMessage}
                            </FormattedText>
                        </Button>
                    </Flex>
                </PaddedDiv>

            </Card>
        </>
    );
};

export default Recipe;