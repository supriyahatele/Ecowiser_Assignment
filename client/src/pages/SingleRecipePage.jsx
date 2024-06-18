import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text, Image, Stack, Spinner, Center, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/vars';

const SingleRecipePage = () => {
  const { id } = useParams(); // Access the recipe id from URL params
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/recipe/getRecipeById/${id}`, config);
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
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text fontSize="xl" color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box maxW="4xl" mx="auto" p="6" boxShadow="lg" borderRadius="md" bg="white" mt='30px' mb={"40px"}>
      <VStack spacing={4} align="start">
        <Heading size="2xl" fontWeight="bold" color="teal.500">{recipe.title}</Heading>
        <Image src={recipe.image} height="300px" width="full" alt={recipe.title} borderRadius="md" objectFit="cover" />
        <Text fontSize="lg" mt="4" color="gray.700" fontStyle="italic">{recipe.description}</Text>

        <Heading size="lg" mt="6" fontWeight="semibold" color="teal.600">Ingredients:</Heading>
        <Stack spacing={1} pl="4">
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} fontSize="md" color="gray.800">{ingredient}</Text>
          ))}
        </Stack>

        <Heading size="lg" mt="6" fontWeight="semibold" color="teal.600">Cooking Steps:</Heading>
        {recipe.steps.map((step) => (
          <Box key={step.stepNumber} mt="4" pl="4" borderLeft="4px" borderColor="teal.500">
            <Heading size="md" fontWeight="medium" color="teal.700">{`Step ${step.stepNumber}:`}</Heading>
            <Text fontSize="md" color="gray.800" mt="2">{step.instruction}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SingleRecipePage;
