import { Box, Center, Heading, useMediaQuery } from "@chakra-ui/react";
import { ListEmployee } from "../components/listEmployee";
import { ModalAddWorker } from "../components/modal/modalAddWorker";

export const Admin = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)");

  return (
    <Box bgColor={"#27374D"} minH={"100vh"}>
      <Center>
        <Heading
          pt={isLargerThanSm ? 10 : 4}
          color={"white"}
          fontSize={isLargerThanSm ? "50px" : "30px"}
        >
          List of employee
        </Heading>
      </Center>
      <Box pt={isLargerThanSm ? 10 : 4}>
        <ListEmployee />
      </Box>
      <Center mt={isLargerThanSm ? 15 : 10}>
        <ModalAddWorker />
      </Center>
    </Box>
  );
};
