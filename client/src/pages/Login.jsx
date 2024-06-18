import { Navigate, useNavigate } from "react-router-dom";
import './login.css';
import { useState, useContext } from "react";
import axios from "axios";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/vars";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

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
      const response = await axios.post(`${BASE_URL}/user/login`, formdata);
      const { token, username } = response.data;
      console.log(response.data);

      handleLogin(token, username);
      setFormdata(initState);

      if (token) {
        toast({
          title: 'Login Successful!',
          description: `Welcome back, ${username}!`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast({
        title: 'Error Occurred!',
        description: error.response?.data?.message || 'An unknown error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

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
      <Box display={"flex"} mt={"50px"} justifyContent={"center"} alignItems={"center"} gap={"20px"}>
        <Text color={"blue.500"} fontSize={"sm"}>Not an User</Text>
        <Button padding={"5"} color={"white"} backgroundColor={"#12a7d2"} fontSize={"20px"} borderRadius={"20px"} width={"120px"} onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </div>
  );
};

export default Login;
