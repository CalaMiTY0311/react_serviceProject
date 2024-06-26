import react, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);

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

        {isLogin ? (
          <div>
            <Login />
            <CardBody>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setIsLogin(false)}
              >
                Don't have an account?
              </Button>
              <GoogleAuth />
            </CardBody>
          </div>

        ) : (

          <div>
            <Signup />
            <CardBody>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setIsLogin(true)}
              >
                Have an account?
              </Button>
              <GoogleAuth />
            </CardBody>
          </div>
        )}

      </Card>
    </div>
  )
}
export default AuthForm;