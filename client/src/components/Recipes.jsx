import { BASE_URL } from "../utils/vars";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Spinner,
  Input,
  InputGroup,
  Heading,
  InputRightElement,
  Text,
  Button,
  Image,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get( 
         ` ${BASE_URL}/recipe/getAllRecipes?page=${page}`
        );
        setRecipes(response.data.recipes);
        setFilteredRecipes(response.data.recipes);
      } catch (error) {
        setError("Error fetching recipes. Please try again later.");
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box p="2">
      <Stack height="450px" width="100%">
        <Box position="relative" height="100%" width="98%" margin={"auto"} p="10px">
          <Image
            src="https://media.istockphoto.com/id/1423092276/photo/business-lunch-in-cafe-tasty-food-on-table-pizza-with-greenery-mozzarella-cheese-bacon-fried.jpg?b=1&s=612x612&w=0&k=20&c=i-RDfPsjYzsYxF61IhTLAVtpp0eYWsAODgNdfPSByoc="
            alt="Delicious food"
            boxSize="100%"
            objectFit="cover"
            opacity="0.8"
            borderRadius="20px"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color="white"
            p="1px"
            borderRadius="md"
            textAlign={"center"}
            w="90%"
          >
            <Text
              fontSize="4xl"
              fontWeight={"700"}
              textShadow={"4px  4px 4px white"}
              textDecoration={"underline"}
              color={"rgb(175, 20, 20)"}
            >
              Good food is the foundation of happiness.
            </Text>

            <InputGroup width="50%" margin={"auto"} mt="50px">
              <InputRightElement pointerEvents="none">
                <SearchIcon
                  color="white"
                  mt="20px"
                  mr="20px"
                  height={"20px"}
                  w="20px"
                />
              </InputRightElement>
              <Input
              bg='rgba(0, 0, 0, 0.5)'
                border={"5px solid white"}
                borderRadius={"25px"}
                h="50px"
                fontWeight={"500"}
                fontSize="2xl"
                type="text"
                color={"white"}
                placeholder="Search recipes..."
                _placeholder={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "sm",
                }}
                value={search}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Box>
        </Box>
      </Stack>


      <Grid
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
        <Button
          mr={5}
          w="100px"
          h="50px"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Heading fontSize="lg">{page}</Heading>
        <Button
          ml={5}
          w="100px"
          h="50px"
          onClick={handleNextPage}
          disabled={filteredRecipes.length < 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export { Recipe };