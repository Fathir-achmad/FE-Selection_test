import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";

export const HistoryAbsen = () => {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  const getEmployee = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/absen/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHistory(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const formatDate = (dateTimeString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateTimeString).toLocaleTimeString([], options);
  };

  return (
    <Box width="90%" mx={isLargerThanSm ? "auto" : "2"}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th color={"white"}>Absen in</Th>
              <Th color={"white"}>Absen out</Th>
              <Th color={"white"}>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history?.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Flex alignItems={isLargerThanSm ? "center" : "flex-start"}> 
                    <Box ml={isLargerThanSm ? "10px" : "0"}> 
                      <Text fontWeight="bold" fontSize={isLargerThanSm ? "14px" : "12px"} color="white">
                        {formatDate(item.createdAt)}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  {item.createdAt !== item.updatedAt ? (
                    <Text color="white">{formatDate(item.updatedAt)}</Text>
                  ) : null}
                </Td>
                <Td>
                  <Text color="white">{item.date}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
