import react, { useState } from "react";
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

import Signup from "./Signup";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

import Login from "./Login";
import useLogin from "../../hooks/useLogin";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);

  const handleForm = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  const { loginLoading, loginError, login } = useLogin();
  const { signupLoading, signupError, signup } = useSignUpWithEmailAndPassword();

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Login />


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
  )
}
export default AuthForm;