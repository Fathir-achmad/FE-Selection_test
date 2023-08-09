import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";

export const LogSalary = () => {
  const [fee, setFee] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const token = localStorage.getItem('token');
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const [isLargerThanSm] = useMediaQuery("(min-width: 30em)"); 

  const getSalary = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/position/salary', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const salaryData = response.data.results;
      setFee(salaryData);
      const monthlyTotals = [];
      let yearlyTotal = 0;

      salaryData.forEach(item => {
        const date = new Date(item.date);
        const month = date.getMonth();
        const salary = item.fee;

        if (!monthlyTotals[month]) {
          monthlyTotals[month] = salary;
        } else {
          monthlyTotals[month] += salary;
        }

        yearlyTotal += salary;
      });

      setMonthlyTotals(monthlyTotals);
      setYearlyTotal(yearlyTotal);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSalary();
  }, []);

  return (
    <Box width="90%" mx={isLargerThanSm ? "auto" : "2"}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th color={"white"}>Date</Th>
              <Th color={"white"}>Absen in</Th>
              <Th color={"white"}>Absen out</Th>
              <Th color={"white"}>Salary by day</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fee?.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Text color="white">{item.date}</Text>
                </Td>
                <Td>
                  <Text color="white">{item.clockIn ? "Done" : "Not yet"}</Text>
                </Td>
                <Td>
                  <Text color="white">{item.clockOut ? "Done" : "Not yet"}</Text>
                </Td>
                <Td>
                  <Text color="white">{item.fee}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <TableContainer mt={isLargerThanSm ? 20 : 10}>
        <Table>
          <Thead>
            <Tr>
              <Th color={"white"}>Month</Th>
              <Th color={"white"}>Total Salary</Th>
            </Tr>
          </Thead>
          <Tbody>
            {monthlyTotals.map((total, index) => (
              <Tr key={index}>
                <Td>
                  <Text color="white">{monthNames[index]}</Text>
                </Td>
                <Td>
                  <Text color="white">{total}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <TableContainer mt={isLargerThanSm ? 20 : 10}>
        <Table>
          <Tbody>
            <Tr>
              <Td>
                <Text color="white" fontWeight="bold">Total Salary per Year:</Text>
              </Td>
              <Td>
                <Text color="white" fontWeight="bold">{yearlyTotal}</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
