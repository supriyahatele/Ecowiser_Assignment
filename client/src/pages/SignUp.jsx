import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { BASE_URL } from '../utils/vars';

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const initState = {
    name: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, formData);
      console.log(response.data);
      toast({
        title: 'Registration Successful!',
        description: "You've successfully registered.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      navigate('/login');
      setFormData(initState);
    } catch (e) {
      console.error('signup failed', e);
      toast({
        title: 'Error Occurred!',
        description: e.response?.data?.errors?.map((err) => err.msg).join(', ') || 'An unknown error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

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
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"20px"}>
        <Text color={"blue.500"} fontSize={"sm"}>Not an User</Text>
        <Button padding={"5"} color={"white"} backgroundColor={"#12a7d2"} fontSize={"18px"} borderRadius={"20px"} width={"120px"} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
