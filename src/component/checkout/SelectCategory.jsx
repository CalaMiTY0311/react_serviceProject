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
    variant={category.Male ? 'solid' : 'outline'}
    size='lg'
    onClick={() => handleSelectCategory('Male')}
>
    Male
</Button>

<Button
    colorScheme='teal'
    variant={category.Female ? 'solid' : 'outline'}
    size='lg'
    onClick={() => handleSelectCategory('Female')}
>
    Female
</Button>

<Button
    colorScheme='teal'
    variant={category.Other ? 'solid' : 'outline'}
    size='lg'
    onClick={() => handleSelectCategory('Other')}
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
    variant={category.Vtuber ? 'solid' : 'outline'}
    size='lg'
    onClick={() => handleSelectCategory('Vtuber')}
>
    Vtuber
</Button>

<Button
    colorScheme='teal'
    variant={category.Actor ? 'solid' : 'outline'}
    size='md'
    onClick={() => handleSelectCategory('Actor')}
>
    Actor
</Button>
                
            </Stack>
        </>
    );
}
export default SelectCategory;