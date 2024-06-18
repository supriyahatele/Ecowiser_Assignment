import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const RecipeCard = ({ recipe }) => {
  return (
    <>
      <MotionBox
        boxShadow="md"
        borderWidth="1px"
        borderRadius="md"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Box
          maxW="lg"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="10px"
          boxShadow="md"
          h="450px"
        >
          <Image
            borderRadius={"10px"}
            src={recipe.image}
            p="3px"
            height={"200px"}
            width={"100%"}
            alt={recipe.title}
          />
          <Stack mt="6" spacing="1" pl="3px">
            <Heading size="md" pl="3px">
              {recipe.title}
            </Heading>
            <Stack h="120px" p="2px">
              <Text pl="3px">{recipe.description}</Text>
              <VStack align="start" flex="1">
                <Text fontweight='200px'>{`ingredients: ${recipe.ingredients.join(", ")}`}</Text>
              </VStack>
              {/* <Text pl="3px" fontWeight={"medium"}>{recipe.ingredients.join(',')}</Text> */}
            </Stack>
            <Link to={`/recipes/${recipe._id}`}>
              <Button colorScheme="blue" w="100%">
                View Recipe
              </Button>
            </Link>
          </Stack>
        </Box>
      </MotionBox>
    </>
  );
};

export default RecipeCard;
