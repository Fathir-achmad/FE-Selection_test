import { Avatar, Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";

export const ListEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const token = localStorage.getItem('token');
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  const getEmployee = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/auth/employee',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setEmployee(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <Box width="90%" mx={isLargerThanSm ? "auto" : "2"}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th color={"white"}>Name</Th>
              <Th color={"white"}>Role</Th>
              <Th color={"white"}>Birthdate</Th>
              <Th color={"white"}>Salary</Th>
              <Th color={"white"}>Join date</Th>

            </Tr>
          </Thead>
          <Tbody>
            {employee?.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Flex alignItems={isLargerThanSm ? "center" : "flex-start"}>
                    <Avatar src={`http://localhost:8000/${item.imgProfile}`} size={isLargerThanSm ? "md" : "sm"} />
                    <Box ml={isLargerThanSm ? "10px" : "2"} mt={isLargerThanSm ? 0 : 2}> 
                      <Text fontWeight="bold" fontSize={isLargerThanSm ? "14px" : "12px"} color="white">
                        {item.fullName}
                      </Text>
                      {isLargerThanSm && (
                        <Text fontSize="14px" color="white">
                          {item.email}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Text color="white">{item.Position?.position}</Text>
                </Td>
                <Td>
                  <Text color="white">{item.birthdate}</Text>
                </Td>
                <Td>
                  <Text color="white">{item.Position.fee}</Text>
                </Td>
                <Td>
                  <Text color="white">{item.createdAt.substring(0,10)}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
