import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";

// import { auth, userInfo } from '../../config/firebase-config';
// import firebase from '../../config/firebase-config';
// import { Auth } from '../../context/authContext';

import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import useLogin from "../../hooks/useLogin";

import { useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";

const SignupLogin = () => {
 
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);

  const [ register, setRegister ] = useState({
    username:"",
    email:"",
    password:""
  });

  const [ loginInputs, setLoginInputs ] = useState({
    email:"",
    password:""
  })

  const {registerLoading, registerError, signup } = useSignUpWithEmailAndPassword()
  const {loginLoading, loginError, login } = useLogin()

  const handleSignup = () => {
    if (action === 'Sign Up') {
      signup(register);
    } else {
      setAction('Sign Up');
    }
  };

  const handleLogin = () => {
    if (action === 'Login') {
      login(loginInputs);
    } else {
      setAction('Login');
    }
  };
 
  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {action === "Login" ? <div></div> :
            <Input
              label="Name"
              size="lg"
              type="text"
              name="name"
              value={register.username}
              onChange={(event) => setRegister({...register, username: event.target.value})}
            />}
          <Input
            label="Email"
            size="lg"
            type="Email"
            name="Email"
            onChange={(event) => {
              if (action === "Sign Up") {
                setRegister({...register,email: event.target.value});
              } else {
                setLoginInputs({...loginInputs,email:event.target.value});
              }
            }}
          />
          <Input
            label="Password"
            size="lg"
            type={showPassword ? "text" : "passwod"}
            name="password"
            onChange={(event) => {
              if (action === "Sign Up") {
                setRegister({...register,password: event.target.value});
              } else {
                setLoginInputs({...loginInputs,password:event.target.value});
              }
            }}
          />
          <div className="-ml-2.5"></div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            variant={action === "Sign Up" ? "gradient" : "outlined"}
            fullWidth
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          <br />
          <Button
            variant={action === "Login" ? "gradient" : "outlined"}
            fullWidth
            isLoading={loginLoading}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Image is Optional
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupLogin;
