/* eslint-disable react/prop-types */
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import './App.css'
import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Recipe } from "./components/Recipes"
import SingleRecipePage from "./pages/SingleRecipePage"
import { PrivateRoute } from "./components/PrivateRoute"




const App = () => {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Recipe />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signUp" element={<SignUp />}  />   
        <Route path="/recipes/:id" element={ <PrivateRoute><SingleRecipePage /></PrivateRoute>}  />  
      </Routes>
      <Footer />
    </Box>
  );
}

export default App
