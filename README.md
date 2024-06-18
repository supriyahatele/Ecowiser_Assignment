# Food Recipes Web App

 ## Project Overview
This web application allows users to search, view, and manage food recipes. Users can sign up, log in, and add their own recipes. The application supports CRUD (Create, Read, Update, Delete) operations for recipes and provides a user-friendly interface for exploring and managing recipes.

## Deployed Link:
- FrontEnd :  https://ecowiser-assignment-iota.vercel.app/
- Backend : https://ecowiser-backend-1.onrender.com

## Project Type 
 FullStack Project

## Features
- *User Authentication*: Users can sign up and log in to the application.
- *Recipe Search*: Users can search for recipes by the name of the food or ingredients used.
- *Recipe Display*: When a recipe is selected, the application displays images, a description, ingredients, and the steps involved in preparing the recipe.
- *User-Generated Recipes*: Logged-in users can add, edit, and delete their own recipes.
- *Responsive Design*: The application features a responsive design to ensure a great user experience across different devices.



## Tech Stack

### Frontend
- Framework: React.js,
- Styling: CSS, chakra-UI
### Backend
- Framework: Node.js with Express.js,
- Database: MongoDB

## Other Tools
- Password Hashing :Bcrypt,
- Authentication: JWT (JSON Web Tokens),
- API Testing: Postman,

## Folder Structure
 


## API Endpoints
 ### Authentication
 - POST /user/register: User signup
 - POST /user/login: User login

### Recipes
 - GET /recipe/getAllRecipes: Get all recipes
 - GET /recipe/getRecipeById/:id: Get a specific recipe (authenticated)
 - POST /recipe/createRecipe: Add a new recipe (authenticated)
 - PATCH /recipe/updateRecipe/:id: Update a recipe (authenticated)
 - DELETE /recipe/deleteRecipe/:id: Delete a recipe (authenticated)
 - GET /recipe//getAllRecipe/user: Get all recipes of a specific user (authenticated)

  ## Credentials

  ## screenshots
