import { Avatar, Box, Center, useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ModalAddAvatar } from "./modal/modalAddAvatar";

export const ImageProfile = () => {
  const dataRedux = useSelector((state) => state.user.value);
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  return (
    <Box>
      <Center mt={3}>
        <Avatar src={`http://localhost:8000/${dataRedux.imgProfile}`} size={isLargerThanSm ? "2xl" : "xl"} />
      </Center>
      <Center mt={3}>
        <ModalAddAvatar />
      </Center>
    </Box>
  );
};
