import React from "react";
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Tag,
  useToast,
  useMediaQuery, 
} from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const dataRedux = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const toast = useToast();
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  const onLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Goodbye!",
      description: "See you again!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        bg="blue.500"
        color="white"
        top={0}
        left={0}
        width="100%"
        zIndex={999}
        direction={{ base: "column", md: "row" }} 
      >
        <Flex
          direction={{ base: "column", md: "row" }} 
          align={{ base: "center", md: "flex-start" }}
          mt={{ base: 4, md: 0 }} 
          mb={{ base: 4, md: 0 }}
        >
          <Text mr={{ base: 0, md: "1rem" }} mb={{ base: "0.5rem", md: 0 }} fontWeight={"bold"} fontSize={"30px"} as={Link} to="/">
            Home
          </Text>
          <Text mr={{ base: 0, md: "1rem" }} mb={{ base: "0.5rem", md: 0 }} fontWeight={"bold"} fontSize={"30px"} as={Link} to="/attendance">
            Attendance
          </Text>
          <Text mr={{ base: 0, md: "1rem" }} mb={{ base: "0.5rem", md: 0 }} fontWeight={"bold"} fontSize={"30px"} as={Link} to="/salary">
            Salary
          </Text>
          {dataRedux.isAdmin ? (
            <Text mr={{ base: 0, md: "1rem" }} mb={{ base: "0.5rem", md: 0 }} fontWeight={"bold"} fontSize={"30px"} as={Link} to="/admin">
              Employee
            </Text>
          ) : null}
        </Flex>
        <Menu>
          <MenuButton>
            <Flex>
              <Tag
                size={isLargerThanSm ? "lg" : "md"} 
                borderRadius="full"
                p={isLargerThanSm ? "6px" : "4px"} 
                pr={5}
                _hover={{ colorScheme: "blue" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Avatar src={`http://localhost:8000/${dataRedux.imgProfile}`} size={isLargerThanSm ? "md" : "sm"} /> {/* Menggunakan ukuran Avatar yang berbeda sesuai dengan media query */}
                {isLargerThanSm && (
                  <Box ml="3">
                    <Text fontWeight="bold">{dataRedux.fullname}</Text>
                    <Text fontSize="sm">{dataRedux.email}</Text>
                  </Box>
                )}
              </Tag>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onLogout} color={"red"}>
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Outlet />
    </Box>
  );
};
