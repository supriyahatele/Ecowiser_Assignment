import React, { useEffect, useState } from 'react';
import { Box, Grid, Spinner, Input, InputGroup, InputLeftElement, Text, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recipe/getAllRecipes?page=${page}`);
        setRecipes(response.data.recipes);
        // console.log(response.data.recipes)
        setFilteredRecipes(response.data.recipes);
      } catch (error) {
        setError('Error fetching recipes. Please try again later.');
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]); 

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, recipes]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
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

  return (
    <Box p="6">
      <InputGroup mb="6" ml="8" width={'300px'}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={6}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </Grid>
      <Box width="20%" margin="auto" mt="30px">
        <Button mr={5} onClick={handlePrevPage} disabled={page === 1}>
          prev
        </Button>
        {page}
        <Button ml={5} onClick={handleNextPage} disabled={filteredRecipes.length < 1}>
          next
        </Button>
      </Box>
    </Box>
  );
};

export { Recipe };
