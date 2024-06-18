// /* eslint-disable no-unused-vars */
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { useAuth } from "../../context/AuthContext";
// import { BASE_URL } from "../../utils/vars";

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useAuth();

//   async function submitHandler() {
//     setLoading(true);
//     if (!email || !password) {
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

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true 
//       };
//       const res = await axios.post(`${BASE_URL}/api/users/login`, { email, password }, config);
//       const data = res.data;
//       toast({
//         title: 'Login Successful!',
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       // Cookies.set('userInfo', data.token, { expires: 1 });
//       // console.log(data);
//       localStorage.setItem('userDetails',JSON.stringify(data))
//       setLoading(false);
//       setEmail('');
//       setPassword('');
//       navigate("/");
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: 'Error Occurred!',
//         description: error.response.data.message,
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//         position: "bottom"
//       });
//       setLoading(false);
//     }
//   }

//   return (
//     <VStack spacing={"5px"} color={"black"}>
//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           type="email"
//           value={email}
//           placeholder="Enter your email"
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

//       <Button
//         colorScheme="blue"
//         w={"100%"}
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Login
//       </Button>
//       <Button
//         variant={"solid"}
//         colorScheme="red"
//         w={"100%"}
//         style={{ marginTop: 15 }}
//         onClick={() => {
//           setEmail("test3@example.com");
//           setPassword("password123");
//         }}
//       >
//         Get Guest User Credentials
//       </Button>
//     </VStack>
//   );
// };

// export default Login;
// import { useDispatch, useSelector } from "react-redux";


import { Navigate, useNavigate } from "react-router-dom";
import './login.css';
import { useState, useContext } from "react";
import axios from "axios";
import { Box, Button, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/vars";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const initState = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // http://localhost:8080    ${BASE_URL}
      const response = await axios.post(` ${BASE_URL}/user/login`, formdata);
      const token = response.data.token; 
      const username = response.data.username; // Corrected extraction of token
      console.log(response.data)
      // Assuming handleLogin sets auth.token and auth.isLoggedIn in context
      handleLogin(token,username);
      setFormdata(initState);
  
      // Check if authentication was successful
      if (token) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      // Handle error state here (e.g., set error message state)
    }
  };
  

  // if (auth.token && auth.isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  const handleRegister = () => {
    navigate("/signUp");
  };

  return (
    <div className="container">
      <div className="heading">Sign In</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          required
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={formdata.email}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formdata.password}
          onChange={handleChange}
        />
        <span className="forgot-password">
          <a href="#">Forgot Password ?</a>
        </span>
        <input className="login-button" type="submit" value="Sign In" />
      </form>
      {/* <div className="social-account-container">
        <span className="title">Or Sign in with</span>
        <div className="social-accounts">
          <button className="social-button google">
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          </button>
          <button className="social-button apple">
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
            </svg>
          </button>
          <button className="social-button twitter">
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
            </svg>
          </button>
        </div>
      </div> */}
      <Box display={"flex"} mt={"50px"} justifyContent={"center"} alignItems={"center"} gap={"20px"}>
        <Text color={"blue.500"} fontSize={"sm"}>Not an User</Text>
        <Button padding={"5"} color={"white"} backgroundColor={"#12a7d2 "} onClick={handleRegister}> Register </Button>
      </Box>
    </div>
  );
};

export default Login;
