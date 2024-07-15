'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'

import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import GoogleAuth from './GoogleAuth';

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();

  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
        <Heading fontSize={'2xl'}>Sign in to your account</Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                type="email" 
                          onChange={(event) => {
            setInputs({ ...inputs, email: event.target.value });
          }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                type="password" 
                          onChange={(event) => {
            setInputs({ ...inputs, password: event.target.value });
          }}
                />  
              </FormControl>
              <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox> */}
              <Link to="/signup">
                <Button variant="link" color={'blue.500'}>Have not Account?</Button>
              </Link>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={() => login(inputs)}>
              Sign in
            </Button>
            <GoogleAuth />
          </Stack>
        </Stack>
      </Flex>
  );
};

export default Login;