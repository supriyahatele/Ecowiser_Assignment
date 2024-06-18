import { BASE_URL } from '../utils/vars';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Spinner, Input, InputGroup, Heading, InputLeftElement, Text, Button, Image, Center } from '@chakra-ui/react';
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
        const response = await axios.get(`${BASE_URL}/recipe/getAllRecipes?page=${page}`);
        setRecipes(response.data.recipes);
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
      <Center mb="3" height="300px"  width="90%" margin="auto">
        <Box position="relative"  >
          <Image
            src="https://media.istockphoto.com/id/1423092276/photo/business-lunch-in-cafe-tasty-food-on-table-pizza-with-greenery-mozzarella-cheese-bacon-fried.jpg?b=1&s=612x612&w=0&k=20&c=i-RDfPsjYzsYxF61IhTLAVtpp0eYWsAODgNdfPSByoc="
            alt="Delicious food"
            borderRadius="md"
            objectFit="cover"
            width="100vh"
            height="300px"
            opacity='0.7'
          />
          <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" color="white"  p="4" borderRadius="md">
            <Text fontSize="3xl" fontWeight="medium">"Good food is the foundation of happiness."</Text>
          </Box>
        </Box>
      </Center>
      
      <InputGroup  margin={"auto"} mb="6"  mt="6"
       width={{
        base: "60%",
        sm: "60%",
        md: "40%",
        lg: "40%",
        xl: "30%",
        "2xl": "30%",
      }}
       >
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

      <Grid 
        // templateColumns="repeat(auto-fill, minmax(300px, 1fr))" 
        gap="20px" 
        p="20px"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
          xl: "repeat(3,1fr)",
          "2xl": "repeat(4,1fr)",
        }}
      >
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </Grid>

      <Box 
        width="100%" 
        mt="30px" 
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        p="10px"
      >
        <Button mr={5} w="100px" h="50px" onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </Button>
        <Heading fontSize="lg">{page}</Heading>
        <Button ml={5} w="100px" h="50px" onClick={handleNextPage} disabled={filteredRecipes.length < 1}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export { Recipe };
