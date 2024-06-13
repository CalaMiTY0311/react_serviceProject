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

import useLogin from "../../hooks/useLogin";

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();



  return (
    <>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          size="lg"
          type="Email"
          name="Email"
          onChange={(event) => {
            setInputs({ ...inputs, email: event.target.value });
          }}
        />
        <Input
          label="Password"
          size="lg"
          type="text"
          name="password"
          onChange={(event) => {
            setInputs({ ...inputs, password: event.target.value });
          }}
        />
        <div className="-ml-2.5"></div>
      </CardBody>

      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          onClick={() => login(inputs)}
        >
          Login
        </Button>
      </CardFooter>
    </>
  );
};

export default Login;