import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useParams();
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };
  const RegisSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    birthdate: Yup.string().required("Birthdate is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password didn't match")
      .required("Password is required"),
  });
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/auth/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Updated account",
        description: "Success updated your account",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "An error occurred while updated your account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Formik
      initialValues={{
        fullname: "",
        birthdate: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisSchema}
      onSubmit={(value, actions) => {
        handleSubmit(value);
        actions.resetForm();
      }}
    >
      {(props) => {
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
              p={8}
              maxWidth="500px"
              borderWidth={"10px"}
              borderRadius="md"
              boxShadow="lg"
              bgColor={"#526D82"}
            >
              <Box>
                <Heading mb={6} textAlign="center" textColor={"#DDE6ED"}>
                  Update your account
                </Heading>
                <FormControl>
                  <FormLabel textColor={"#DDE6ED"}>Fullname</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="fullname"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type="text"
                    name="fullname"
                    placeholder="Enter your fullname"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"#DDE6ED"}>Birthdate</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="birthdate"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type="date"
                    name="birthdate"
                    placeholder="Enter your birthdate"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"#DDE6ED"}>Password</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    mb={4}
                    bgColor={"white"}
                    id="password"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"#DDE6ED"}>
                    Cofirm your password
                  </FormLabel>
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter your password"
                    mb={4}
                    bgColor={"white"}
                    id="confirmPassword"
                  />
                </FormControl>
                <Checkbox
                  textColor={"#DDE6ED"}
                  isChecked={showPassword}
                  onChange={SeePsw}
                  mb={4}
                >
                  Show Password
                </Checkbox>
              </Box>
              <Button colorScheme="blue" size="lg" width="full" type="submit">
                Updated
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
