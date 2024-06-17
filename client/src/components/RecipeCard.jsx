import React from 'react';
import { Box, Image, Text, Stack, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="md"
    >
      <Image src={recipe.image} height={"200px"} width={"240px"} alt={recipe.title} />
      <Stack mt="6" spacing="3">
        <Heading size="md">{recipe.title}</Heading>
        <Text>{recipe.description}</Text>
        <Link to={`/recipes/${recipe._id}`}>
          <Button colorScheme="blue">View Recipe</Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default RecipeCard;
