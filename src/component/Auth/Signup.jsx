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
// import { Alert, AlertIcon } from "@chakra-ui/react";

import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { loading, error, signup } = useSignUpWithEmailAndPassword()

  return (
    <>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Name"
          size="lg"
          type="text"
          name="name"
          value={register.username}
          onChange={(event) => setRegister({ ...register, username: event.target.value })}
        />
        <Input
          label="Email"
          size="lg"
          type="Email"
          name="Email"
          value={register.email}
          onChange={(event) => {
            setRegister({ ...register, email: event.target.value });
          }}
        />
        <Input
          label="Password"
          size="lg"
          type="text"
          name="password"
          value={register.password}
          onChange={(event) => {
            setRegister({ ...register, password: event.target.value });
          }}
        />
        <div className="-ml-2.5"></div>
      </CardBody>

      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          //   isLoading={loading}
          onClick={() => signup(register)}
        >
          Sign Up
        </Button>
        {/* {error && (
          <Alert status='error' fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={12} />
            {error.message}
          </Alert>
        )} */}
        {error && (
  <div role="alert" style={{
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    fontSize: '13px'
  }}>
    <strong style={{ marginRight: '4px' }}>Error:</strong>
    {error.message}
  </div>
)}
      </CardFooter>
    </>
  );
};

export default Signup;