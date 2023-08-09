import { Box, Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";

export const AbsenTable = () => {
  const [absen, setAbsen] = useState([]);
  const token = localStorage.getItem("token");

  const getAbsen = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/absen", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAbsen(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAbsen();
  }, []);

  const convertToLocaleTime = (utcTime) => {
    const date = new Date(utcTime);
    return date.toLocaleString();
  };

  return (
    <Box textAlign={"center"} marginTop={10}>
      <TableContainer>
        <Table alignContent={"center"}>
          <Tr>
            <Th color={"white"} fontWeight={"bold"}>
              Clock-In
            </Th>
            <Th color={"white"} fontWeight={"bold"}>
              Clock-Out
            </Th>
          </Tr>
          {absen?.map((item) => (
            <Tbody key={item.id}>
              <Td color={"white"}>{convertToLocaleTime(item.createdAt).substring(10,19)}</Td>
              {item.createdAt !== item.updatedAt ? (
                <Td color={"white"}>{convertToLocaleTime(item.updatedAt).substring(10,19)}</Td>
              ) : (
                <Td />
              )}
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </Box>
  );
};
