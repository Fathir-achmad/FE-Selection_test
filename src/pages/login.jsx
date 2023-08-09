import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setValue } from "../redux/userSlice";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  const SeePsw = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (data) => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/api/auth/login`,
        data
      );
      localStorage.setItem("token", response.data.token);
      dispatch(setValue(response.data.checkLogin));
      toast({
        title: "Login Success",
        description: "You have successfully logged in.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      toast({
        title: "Login Error",
        description: "An error occurred during login.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(value, action) => {
        onLogin(value);
      }}
    >
      {({ props }) => {
        return (
          <Box
            as={Form}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgColor={"#27374D"}
          >
            <Box
              p={isLargerThanSm ? 8 : 4} 
              maxWidth="500px"
              borderWidth={"10px"}
              borderRadius="md"
              boxShadow="lg"
              bgColor={"#526D82"}
            >
              <Box>
                <Heading
                  mb={isLargerThanSm ? 6 : 4} 
                  textAlign="center"
                  textColor={"#DDE6ED"}
                  fontSize={isLargerThanSm ? "2xl" : "xl"} 
                >
                  Login to your account
                </Heading>
                <FormControl id="email">
                  <FormLabel textColor={"#DDE6ED"}>Email Address</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    mb={isLargerThanSm ? 4 : 2} 
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel textColor={"#DDE6ED"}>Password</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    mb={isLargerThanSm ? 4 : 2} 
                    bgColor={"white"}
                  />
                </FormControl>
                <Checkbox
                  textColor={"#DDE6ED"}
                  isChecked={showPassword}
                  onChange={SeePsw}
                  mb={isLargerThanSm ? 4 : 2} 
                >
                  Show Password
                </Checkbox>
              </Box>
              <Box mb={isLargerThanSm ? 4 : 2}> 
                <Flex gap={"60px"}>
                  <Flex>
                    <Link href="/pswForgot" color={"white"}>
                      Forgot password? <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                </Flex>
              </Box>
              <Button
                colorScheme="blue"
                size="lg"
                width="full"
                type="submit"
              >
                Sign In
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
