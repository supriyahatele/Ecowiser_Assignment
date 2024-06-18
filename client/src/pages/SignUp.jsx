// import { useToast } from '@chakra-ui/react';
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   VStack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../../utils/vars';
// // import Cookies from 'js-cookie';

// const SignUp = () => {
//   const [show, setShow] = useState(false);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [pic, setPic] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const toast = useToast();

//   const postDetails = (pics) => {
//     setLoading(true);
//     if (pics === undefined) {
//       toast({
//         title: 'Please Select an Image!',
//         status: 'warning',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false);
//       return;
//     }
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "Chat-Application");
//       data.append("cloud_name", "djgrj9kqw");
//       fetch("https://api.cloudinary.com/v1_1/djgrj9kqw/image/upload", {
//         method: 'post',
//         body: data
//       }).then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           setLoading(false);
//         }).catch((error) => {
//           console.log(error);
//           setLoading(false);
//         });
//     } else {
//       toast({
//         title: 'Please Select an Image!',
//         status: 'warning',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false);
//       return;
//     }
//   };

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!username || !email || !password || !confirmPassword) {
//       toast({
//         title: 'Please Fill all the Fields!',
//         status: 'warning',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false);
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast({
//         title: 'Password does not match!',
//         status: 'warning',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         }
//       };
//       const payload = { username, email, password, pic };
//       await axios.post(`${BASE_URL}/api/users/signup`, payload, config);
//       toast({
//         title: 'Registration Successful!',
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false);
//       setUsername('');
//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//       setPic('');
//       navigate("/auth");
//     } catch (error) {
//       console.log('Error details:', error.response.data);
//       toast({
//         title: 'Error Occurred!',
//         description: error.response.data.errors?.map(e => e.msg).join(', ') || 'An unknown error occurred.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false);
//     }
//   };
  

//   return (
//     <VStack spacing={"5px"} color={"black"}>
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter your name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement w={"4.5rem"}>
//             <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="confirm-password" isRequired>
//         <FormLabel>Confirm Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <InputRightElement w={"4.5rem"}>
//             <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="picture">
//         <FormLabel>Upload your Picture</FormLabel>
//         <Input
//           type="file"
//           p={1.5}
//           accept="image/*"
//           onChange={(e) => postDetails(e.target.files[0])}
//         />
//       </FormControl>
//       <Button colorScheme="blue" w={'100%'} style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>Sign Up</Button>
//     </VStack>
//   );
// };

// export default SignUp;


import React, { useState } from 'react';
import './login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Box, Button,Text } from '@chakra-ui/react';
import { BASE_URL } from '../utils/vars';
const SignUp = () => {
const navigate=useNavigate()
  const initState = {
    name:'',
    email: '',
    // phone: '',
    password: '',
  };

  const [formData, setFormData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${BASE_URL}/user/register`, formData);
      console.log(response.data)
    navigate('/login');
    setFormData(initState);
    }catch(e){
      console.error("signup failed", e);
    }
    
  };

 const handleLogin=()=>{
  navigate("/login")
 }
   

  return (
    <div className="container">
      <div className="heading">Register</div>
      <form action="" className="form" onSubmit={handleSubmit}>
        <input
          required
          className="input"
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
      
        <input
          required
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        {/* <input
          required
          className="input"
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        /> */}
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input className="login-button" type="submit" value="Register" />
      </form>
      <Box display={"flex"}  justifyContent={"center"} alignItems={"center"} gap={"20px"}>
        <Text color={"blue.500"} fontSize={"sm"}>Not an User</Text>
        {/* onClick={handleLogin} */}
     <Button padding={"5"}color={"white"}backgroundColor={"#12a7d2 "} onClick={handleLogin}> Login </Button>
     </Box>
    </div>
  );
};

export default SignUp ;