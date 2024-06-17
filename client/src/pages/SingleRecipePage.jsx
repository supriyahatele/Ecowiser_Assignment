import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text, Image, Stack } from '@chakra-ui/react';

const SingleRecipePage = () => {
  const { id } = useParams(); // Access the recipe id from URL params
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recipe/getRecipeById/${id}`);
        setRecipe(response.data); // Assuming response.data is the recipe object
      } catch (error) {
        setError('Error fetching recipe. Please try again later.');
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        Loading...
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text fontSize="xl" color="red.500">{error}</Text>
      </Box>
    );
  }

  // Assuming recipe is structured similarly to your provided example object
  return (
    <Box p="6">
      <Heading size="xl">{recipe.title}</Heading>
      <Image src={recipe.image} alt={recipe.title} mt="4" />
      <Text mt="4">{recipe.description}</Text>

      <Heading size="md" mt="6">Ingredients:</Heading>
      <Stack spacing="1">
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index}>{ingredient}</Text>
        ))}
      </Stack>

      <Heading size="md" mt="6">Cooking Steps:</Heading>
      {recipe.steps.map((step) => (
        <Box key={step.stepNumber} mt="4">
          <Heading size="sm">{`Step ${step.stepNumber}:`}</Heading>
          <Text>{step.instruction}</Text>
          <Image src={step.image} alt={`Step ${step.stepNumber}`} mt="2" />
        </Box>
      ))}
    </Box>
  );
};

export default SingleRecipePage;
