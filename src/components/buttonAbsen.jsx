import { Button, useToast, useMediaQuery } from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";

export const ClockIn = () => {
  const [id, setId] = useState();
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  const handleSubmitClockIn = async () => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/api/absen/in`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setId(response.data.result.id);
      toast({
        title: "Clock in successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
      toast({
        title: "Clock in failed",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleSubmitClockOut = async () => {
    try {
      const values = { id: id };
      const response = await Axios.patch(
        `http://localhost:8000/api/absen/out`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Clock out successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
      toast({
        title: "Clock out failed",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button flex={isLargerThanSm ? 1 : "auto"} colorScheme="green" onClick={handleSubmitClockIn}>
        Clock in
      </Button>
      <Button
        flex={isLargerThanSm ? 1 : "auto"}
        colorScheme="red"
        onClick={handleSubmitClockOut}
      >
        Clock out
      </Button>
    </>
  );
};
