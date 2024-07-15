import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  return (
    <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
        <Heading fontSize={'2xl'}>Sign in to your account</Heading>
        <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                type="name" 
                          onChange={(event) => {
            setRegister({ ...register, username: event.target.value });
          }}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                type="email" 
                          onChange={(event) => {
            setRegister({ ...register, email: event.target.value });
          }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                type="password" 
                          onChange={(event) => {
            setRegister({ ...register, password: event.target.value });
          }}
                />  
              </FormControl>
              <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox> */}
              <Link to="login">
              <Button variant="link" color={'blue.500'}>Have Account?</Button>
              </Link>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={() => signup(register)}>
              Sign in
            </Button>
            <GoogleAuth />
          </Stack>
        </Stack>
      </Flex>
  );
};

export default Signup;