import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

export const ModalAddWorker = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const toast = useToast();
  const token = localStorage.getItem("token");
  const [position, setPosition] = useState();

  const CreateSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    PositionId: Yup.string().required("Position is required"),
  });
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/api/auth/addWorker`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: "Add worker",
        description: "Email has been sent successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error sending mail.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };
  const getPosition = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/position",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosition(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);
  return (
    <Formik
      initialValues={{
        email: "",
        PositionId: "",
      }}
      validationSchema={CreateSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
        onClose();
      }}
    >
      {(props) => {
        return (
          <Box as={Form}>
            <Button onClick={onOpen} colorScheme="green" size="lg">
              <Text> Add worker </Text>
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add worker</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box as={Form}>
                    <FormControl>
                      <FormLabel textColor={"black"}>Email</FormLabel>
                      <ErrorMessage
                        component="div"
                        name="email"
                        style={{ color: "red" }}
                      />
                      <Input
                        as={Field}
                        variant="flushed"
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        mb={4}
                        bgColor={"white"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel textColor={"black"}>Position</FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select position"
                        name="PositionId"
                      >
                        {position?.map((v, i) => {
                          return (
                            <option key={i} value={v.id}>
                              {v.position}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="PositionId"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="green" onClick={props.handleSubmit}>
                    Accept
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        );
      }}
    </Formik>
  );
};
