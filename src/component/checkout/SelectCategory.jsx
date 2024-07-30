import React from "react";
import {
    Box,
    Button,
    Stack
} from "@chakra-ui/react";

const SelectCategory = ({ category, handleSelectCategory }) => {

    return (
        <>
            <Box>
                <h1>Gender</h1>
            </Box>
            <Stack direction="row" spacing={4}>

                <Button
                    colorScheme='teal'
                    variant={category.gender.Male ? 'solid' : 'outline'}
                    size='lg'
                    onClick={() => handleSelectCategory('gender', 'Male')}
                >
                    Male
                </Button>

                <Button
                    colorScheme='teal'
                    variant={category.gender.Female ? 'solid' : 'outline'}
                    size='lg'
                    onClick={() => handleSelectCategory('gender', 'Female')}
                >
                    Female
                </Button>

                <Button
                    colorScheme='teal'
                    variant={category.gender.Other ? 'solid' : 'outline'}
                    size='lg'
                    onClick={() => handleSelectCategory('gender', 'Other')}
                >
                    Other
                </Button>

            </Stack>

            <Box mt={6}>
                <h1>Other Tag</h1>
            </Box>
            <Stack direction="row" spacing={4}>

                <Button
                    colorScheme='teal'
                    variant={category.categories.Vtuber ? 'solid' : 'outline'}
                    size='md'
                    onClick={() => handleSelectCategory('categories', 'Vtuber')}
                >
                    Vtuber
                </Button>

                <Button
                    colorScheme='teal'
                    variant={category.categories.Actor ? 'solid' : 'outline'}
                    size='md'
                    onClick={() => handleSelectCategory('categories', 'Actor')}
                >
                    Actor
                </Button>
                
            </Stack>
        </>
    );
}
export default SelectCategory;