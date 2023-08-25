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
import { Button } from "@material-tailwind/react";
import { getWithdraw, updateWithdrawStatus } from "../../../api/adminApi";
import { getHostById } from "../../../api/userApi";
import Swal from "sweetalert2";

const WithdrawRequests = () => {
  const [withdrawData, setWithdrawData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWithDrawRequests = async () => {
    try {
      const response = await getWithdraw();
      setWithdrawData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWithDrawRequests();
  }, []);
  const handlePaidSuccessfully = async (data) => {
    try {
      await updateWithdrawStatus(data);
  
      // Calculate the updated wallet balance after deducting the amount
      const updatedWalletBalance = data.host.wallet - data.amount;
  
      // Update the withdrawal data with the new status and wallet balance
      const updatedData = withdrawData.map((item) => {
        if (item._id === data._id) {
          return { ...item, status: true, host: { ...item.host, wallet: updatedWalletBalance } };
        }
        return item;
      });
  
      setWithdrawData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  

  const openWithdrawDetailsModal = (data) => {
    Swal.fire({
      title: "Withdrawal Details",
      html: `
        <p>Account Holder: ${data.accountHolder}</p>
        <p>Account Number: ${data.accountNo}</p>
        <p>Branch: ${data.branch}</p>
        <p>Amount: ${data.amount}</p>
      `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Paid Successfully",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePaidSuccessfully(data);
      }
    });
  };

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

    if (!loading) {
      fetchWithdrawData();
    }
  }, [loading]);


  const TABLE_HEAD = ["No", "Name", "Wallet balance","Requested Amount", "Status", "Action"];

  return (
    <div className="mt-12  ml-[5.5rem] md:ml-24 md:w-[calc(100%-320px)]">
      <h2 className="italic mb-4">Withdraw requests</h2>
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
                  <Button color="green" disabled={data.status} onClick={() => openWithdrawDetailsModal(data)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default WithdrawRequests;
