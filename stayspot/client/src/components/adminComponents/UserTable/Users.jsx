import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getUsers, postBlockUser, postUnBlockUser } from "../../../api/adminApi";
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
import userProfile from '../../../assets/logo/user.png';
const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUsersData = async () => {
    try {
      const response = await getUsers();
      setUsersData(response.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const banConfirmation = async (title, text, onSuccess) => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ban!',
    });

    if (result.isConfirmed) {
      onSuccess();
    } else {
      console.log("Cancelled ban");
    }
  };

  const unBan = async (data_id, userName) => {
    banConfirmation(
      'Are you sure?',
      `Do you want to unban the user ${userName}?`,
      async () => {
        try {
          await postUnBlockUser(data_id);
          console.log("unBan", data_id);
          await getUsersData();
          Swal.fire({
            title: 'Un-Ban Successful',
            icon: 'success',
            text: `The user ${userName} has been successfully un-banned.`,
          });
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const ban = async (data_id, userName) => {
    banConfirmation(
      'Are you sure?',
      `Do you want to ban the user ${userName}?`,
      async () => {
        try {
          await postBlockUser(data_id);
          console.log("ban", data_id);
          await getUsersData();
          Swal.fire({
            title: 'Ban Successful',
            icon: 'success',
            text: `The user ${userName} has been successfully banned.`,
          });
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const TABLE_HEAD = ["No","Profile", "Name", "Email", "Status", "Action"];

  return (
    <div className="mt-12 mr-[1.5rem] ml-[5.5rem] md:ml-24 md:w-[calc(100%-320px)]">
    <h2 className="italic mb-4">User details</h2>
       {loading ? (
          <div className="flex justify-center mt-80">
         <Box sx={{ display: 'flex' }}>
         <CircularProgress />
       </Box>
       </div>
        ) : (
    <TableContainer component={Paper}>
      <Table  sx={{
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
          {usersData.map((data, index) => (
            <TableRow key={data._id}  sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add the box shadow style here
            }}>
              <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
              <TableCell align="left" className='w-60'>
              <img src={data.image != null ? data.image : userProfile} className='w-12 h-12' alt={data.title} />

                </TableCell>

              <TableCell align="left">
               
                {`${data.firstName} ${data.lastName}`}</TableCell>
              <TableCell align="left">{data.email}</TableCell>
              <TableCell align="left">{data.blocked ? "Banned" : "Not-Banned"}</TableCell>
              <TableCell align="left">
                {data.blocked ? (
                  <Button onClick={() => unBan(data._id, data.firstName)} color="green">
                    Un-Ban
                  </Button>
                ) : (
                  <Button onClick={() => ban(data._id, data.firstName)} color="red">
                    Ban
                  </Button>
                )}
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

export default Users;
