import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { getHostById } from "../../../api/userApi";
import { getWithdrawById } from "../../../api/hostApi";
import { useSelector } from "react-redux";

function PaymentHistory() {
  const { host } = useSelector((state) => state);
  const [withdrawData, setWithdrawData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWithDrawRequests = async () => {
    try {
      const response = await getWithdrawById(host.details._id);
      console.log(response, "res");
      setWithdrawData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWithDrawRequests();
  }, [host.details._id]);

  useEffect(() => {
    const fetchWithdrawData = async () => {
      try {
        const updatedWithdrawData = await Promise.all(
          withdrawData.map(async (data) => {
            const response = await getHostById(data.hostId);
            return { ...data, host: response.data };
          })
        );
        setWithdrawData(updatedWithdrawData);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (withdrawData.length > 0) {
      fetchWithdrawData();
    }
  }, [withdrawData]);

  const TABLE_HEAD = ["No", "Name", "Wallet balance", "Requested Amount", "Status"];

  return (
    <div className="md:pt-12 pt-6 mx-3 md:mx-24">
      <h2 className="italic mb-4">Withdraw History</h2>
      {loading ? (
        <div className="flex justify-center mt-80">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add the box shadow style here
          }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((head, index) => (
                  <TableCell key={index} align="left">
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawData.map((data, index) => (
                <TableRow key={data._id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add the box shadow style here
                }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" className='w-60'>
                    {data.host && data.host.firstName}
                  </TableCell>
                  <TableCell align="left">  {data.host && data.host.wallet}</TableCell>
                  <TableCell align="left">  {data.amount}</TableCell>
                  <TableCell align="left">  {data.status ? "Paid" : "Requested"}</TableCell>
                  <TableCell align="left">
                    {/* Your content for the last cell */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default PaymentHistory;
