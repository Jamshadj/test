import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@material-tailwind/react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getBookings, getUserById } from "../../../api/adminApi";
import { useNavigate } from "react-router-dom";

const Bookings = () => {

  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const reversedBookingsData = bookingsData.slice().reverse();

  const getBookingsData = async () => {
    try {
      const response = await getBookings();
      setBookingsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingsData();
  }, []);

  const navigate=useNavigate()
  const details = (id) => {
    navigate(`/admin/bookingdetails/${id}`);
  };
  
  // Fetch user data and update the state
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const updatedBookingsData = await Promise.all(
          bookingsData.map(async (data) => {
            const response = await getUserById(data.userId);
            console.log(response, "response");
            return { ...data, user: response.data };
          })
        );
        setBookingsData(updatedBookingsData);
       // Set loading to false after fetching user data
      } catch (error) {
        console.error(error);
        setLoading(false); // Handle errors by setting loading to false
      }
    };
  
    if (!loading) {
      fetchUserData();
    }
  }, [loading]);
  
  const TABLE_HEAD = ["No", "BookingId", "User", "check-In", "Check-Out", "Amount", "status", "Action"];

  return (
    <div className="mt-12  ml-[5.5rem] md:ml-24 md:w-[calc(100%-320px)]">
  <h2 className="italic mb-4">Booking details</h2>
      <div>
        {loading ? (
          <div className="flex justify-center mt-80">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <TableContainer component={Paper}>
            {/* <Table sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add the box shadow style here
            }} aria-label="simple table"> */}
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
              {reversedBookingsData.map((data, index) => (
                <TableRow key={data._id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" className='w-60'>
                  {loading ? 'Loading...' : (data._id || '')}
                  </TableCell>
                  <TableCell align="left" className='w-60'>
                  {loading ? 'Loading...' : (data.user ? `${data.user.firstName} ${data.user.lastName}` :  <CircularProgress />)}

                  </TableCell>
                  <TableCell align="left" className='w-60'>
                    {new Date(data.checkInDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left" className='w-60'>
                    {new Date(data.checkOutDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="left" className='w-60'>
                    {data.totalAmount}
                  </TableCell>
                  <TableCell align="left" className='w-60'>
                    {data.status}
                  </TableCell>
                  <TableCell align="left" className='w-60'>
                    <Button color="blue" onClick={() => details(data._id)} >
                      View
                    </Button>
                  </TableCell>

                  {/* Rest of the TableCell data */}
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default Bookings;
