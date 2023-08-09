import { Box, Center, Heading, useMediaQuery } from "@chakra-ui/react";
import { HistoryAbsen } from "../components/historyAttendance";

export const Attendance = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  return (
    <Box bgColor={"#27374D"} h={"100vh"}>
      <Center>
        <Heading
          pt={isLargerThanSm ? 10 : 4} 
          color={"white"}
          fontSize={isLargerThanSm ? "50px" : "30px"} 
        >
          History attendance
        </Heading>
      </Center>
      <Box pt={isLargerThanSm ? 10 : 4}> 
        <HistoryAbsen />
      </Box>
    </Box>
  );
};
