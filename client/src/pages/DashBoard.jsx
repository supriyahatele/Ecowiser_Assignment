import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  Image,
  Text,
  VStack,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { BASE_URL } from '../utils/vars';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '@chakra-ui/react'; // Import useToast hook

const DashBoard = () => {
  const [recipes, setRecipes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRecipe, setEditRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: [],
    steps: [],
    image: ''
  });
  const { auth } = useContext(AuthContext);
  const toast = useToast(); // Initialize useToast hook

  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/recipe/getAllRecipe/user`, config);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/recipe/deleteRecipe/${id}`, config);
      setRecipes(recipes.filter(recipe => recipe._id !== id));
      toast({
        title: 'Recipe Deleted',
        description: 'Recipe has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Failed to delete recipe.');
      toast({
        title: 'Error',
        description: 'Failed to delete recipe.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (recipe) => {
    setEditRecipe(recipe);
    onOpen();
  };

  const handleAdd = () => {
    setEditRecipe(null); // Reset editRecipe to differentiate between edit and add
    setNewRecipe({
      title: '',
      description: '',
      ingredients: [],
      steps: [],
      image: ''
    });
    onOpen();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editRecipe) {
        const response = await axios.patch(
          `${BASE_URL}/recipe/updateRecipe/${editRecipe._id}`,
          editRecipe,
          config
        );
        setRecipes(recipes.map(recipe => recipe._id === editRecipe._id ? response.data : recipe));
        toast({
          title: 'Recipe Updated',
          description: 'Recipe has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        const response = await axios.post(`${BASE_URL}/recipe/createRecipe`, newRecipe, config);
        setRecipes([...recipes, response.data]);
        toast({
          title: 'Recipe Added',
          description: 'New recipe has been successfully added.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save recipe.');
      toast({
        title: 'Error',
        description: 'Failed to save recipe.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editRecipe) {
      setEditRecipe({ ...editRecipe, [name]: value });
    } else {
      setNewRecipe({ ...newRecipe, [name]: value });
    }
  };

  return (
    <Box p={4} mb={4}>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button colorScheme="teal" mb={4} onClick={handleAdd} 
          >Add Recipe</Button>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
      ) : (
        <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(3,1fr)",
          xl: "repeat(4,1fr)",
          "2xl": "repeat(4,1fr)",
        }}
         gap={6}
          width='90%'
          margin={'auto'}
         >
         
          {recipes.map((recipe) => (
            <Box
              key={recipe._id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Image src={recipe.image} alt={recipe.title} boxSize="100%" height="200px" objectFit="cover"  borderRadius="10px"/>
              <VStack align="start" mt={4} flex="1">
                <Text fontSize="lg" fontWeight="bold">{recipe.title}</Text>
                <Text>{recipe.description}</Text>
                <VStack align="start" flex="1">
                  <Text fontweight='bold'>{ `ingredients: ${recipe.ingredients.join(", ")}`}</Text>
                </VStack>
                <HStack mt={4}>
                  <Button colorScheme="teal" onClick={() => handleEdit(recipe)}>Edit</Button>
                  <Button colorScheme="red" onClick={() => handleDelete(recipe._id)}>Delete</Button>
                </HStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      )}

      {(editRecipe !== null || newRecipe) && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{editRecipe ? 'Edit Recipe' : 'Add Recipe'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="formTitle" mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={editRecipe ? editRecipe.title : newRecipe.title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="formDescription" mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={editRecipe ? editRecipe.description : newRecipe.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="formIngredients" mb={4}>
                <FormLabel>Ingredients</FormLabel>
                <Input
                  type="text"
                  name="ingredients"
                  value={editRecipe ? editRecipe.ingredients.join(', ') : newRecipe.ingredients.join(', ')}
                  onChange={(e) => {
                    const value = e.target.value.split(', ');
                    if (editRecipe) {
                      setEditRecipe({ ...editRecipe, ingredients: value });
                    } else {
                      setNewRecipe({ ...newRecipe, ingredients: value });
                    }
                  }}
                />
              </FormControl>
              <FormControl id="formSteps" mb={4}>
                <FormLabel>Steps</FormLabel>
                <VStack>
                  {(editRecipe ? editRecipe.steps : newRecipe.steps).map((step, index) => (
                    <Box key={index} mb={2}>
                      <HStack>
                        <Input
                          type="text"
                          name={`step-${index}-instruction`}
                          placeholder={`Step ${index + 1} Instruction`}
                          value={step.instruction}
                          onChange={(e) => {
                            const newSteps = (editRecipe ? editRecipe.steps : newRecipe.steps).map((s, i) =>
                              i === index ? { ...s, instruction: e.target.value } : s
                            );
                            if (editRecipe) {
                              setEditRecipe({ ...editRecipe, steps: newSteps });
                            } else {
                              setNewRecipe({ ...newRecipe, steps: newSteps });
                            }
                          }}
                        />
                        <Input
                          type="text"
                          name={`step-${index}-image`}
                          placeholder={`Step ${index + 1} Image URL`}
                          value={step.image}
                          onChange={(e) => {
                            const newSteps = (editRecipe ? editRecipe.steps : newRecipe.steps).map((s, i) =>
                              i === index ? { ...s, image: e.target.value } : s
                            );
                            if (editRecipe) {
                              setEditRecipe({ ...editRecipe, steps: newSteps });
                            } else {
                              setNewRecipe({ ...newRecipe, steps: newSteps });
                            }
                          }}
                        />
                      </HStack>
                    </Box>
                  ))}
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      const newStep = { stepNumber: (editRecipe ? editRecipe.steps : newRecipe.steps).length + 1, instruction: '', image: '' };
                      if (editRecipe) {
                        setEditRecipe({ ...editRecipe, steps: [...editRecipe.steps, newStep] });
                      } else {
                        setNewRecipe({ ...newRecipe, steps: [...newRecipe.steps, newStep] });
                      }
                    }}
                  >
                    Add Step
                  </Button>
                </VStack>
              </FormControl>
              <FormControl id="formImage" mb={4}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  type="text"
                  name="image"
                  value={editRecipe ? editRecipe.image : newRecipe.image}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                {loading ? <Spinner size="sm" />
                  : "Save changes"}
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

    </Box>
  );
};

export { DashBoard };
