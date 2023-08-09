import { Box, Center, Flex, Heading, Textarea, useMediaQuery } from "@chakra-ui/react";
import { Clock } from "../components/clock";
import { ClockIn } from "../components/buttonAbsen";
import { AbsenTable } from "../components/absenTable";
import { ImageProfile } from "../components/avatar";
import { Navigate } from "react-router-dom";

export const HomePage = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)");
  const token = localStorage.getItem("token")
  return token?(
    <Box bgColor={"#27374D"} minH={"100vh"}>
      <Flex justifyContent={"center"} pt={isLargerThanSm ? 10 : 4}> 
        <ImageProfile />
      </Flex>
      <Center>
        <Box w={isLargerThanSm ? "500px" : "90%"}> 
          <Clock />
          <Textarea placeholder="Add notes" mt={isLargerThanSm ? 10 : 6} /> 
          <Center gap={5} mt={isLargerThanSm ? 10 : 6}> 
            <ClockIn />
          </Center>
          <AbsenTable />
        </Box>
      </Center>
    </Box>
  ):(<Navigate to="/login"/>)
};
