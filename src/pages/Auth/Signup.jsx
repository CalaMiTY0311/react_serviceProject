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
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
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
              <Link to="/login">
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
      <Flex flex={1}>
      <Image
        alt={'Login Image'}
        objectFit={'cover'}
        src={
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
        }
      />
    </Flex>
</Stack>
  );
};

export default Signup;