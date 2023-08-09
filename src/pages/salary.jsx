import { Box, Center, Heading, useMediaQuery } from "@chakra-ui/react";
import { LogSalary } from "../components/logSalary";

export const Salary = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)");

  return (
    <Box bgColor={"#27374D"} minH={"100vh"}>
      <Center>
        <Heading
          pt={isLargerThanSm ? 10 : 6}
          color={"white"}
          fontSize={isLargerThanSm ? "50px" : "40px"}
        >
          Your salary
        </Heading>
      </Center>
      <Box pt={isLargerThanSm ? 10 : 6}> 
        <LogSalary />
      </Box>
    </Box>
  );
};
