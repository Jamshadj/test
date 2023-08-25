import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert library
import { getHosts, postAddHost, postBlockHost, postUnBlockHost } from "../../../api/adminApi"; // Import your API functions
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
import userProfile from '../../../assets/logo/user.png';
import { postSignUp } from "../../../api/hostApi";
const Host = () => {
  const [hostsData, setHostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getHostsData = async () => {
    try {
      const response = await getHosts();
      setHostsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getHostsData();
  }, []);
  const addHostPrompt = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add Host',
      html:
        '<input id="swal-input-firstname" class="swal2-input" placeholder="First Name">' +
        '<input id="swal-input-lastname" class="swal2-input" placeholder="Last Name">' +
        '<input id="swal-input-email" class="swal2-input" placeholder="Email">' +
        '<input id="swal-input-phone" class="swal2-input" placeholder="Phone Number">' +
        '<input id="swal-input-password" class="swal2-input" type="password" placeholder="Password">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          firstName: document.getElementById('swal-input-firstname').value,
          lastName: document.getElementById('swal-input-lastname').value,
          email: document.getElementById('swal-input-email').value,
          phoneNumber: document.getElementById('swal-input-phone').value,
          password: document.getElementById('swal-input-password').value
        };
      }
    });
    if (formValues) {
      try {
          const response = await postAddHost(formValues);

          if (!response.data.err) {
              // Show success message
              await getHostsData(); // Refresh host data
              Swal.fire({
                  title: 'Host Added',
                  icon: 'success',
                  text: `The host ${formValues.firstName} has been successfully added.`
              });
          } else {
              // Show error message from response
              Swal.fire({
                  title: 'Error',
                  icon: 'error',
                  text: response.data.message // Assuming the error message is in response.data.message
              });
          }
      } catch (error) {
          console.error(error);
      }
  }
  };


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

  const unBan = async (data_id, hostName) => {
    banConfirmation(
      'Are you sure?',
      `Do you want to unban the host ${hostName}?`,
      async () => {
        try {
          await postUnBlockHost(data_id);
          console.log("unBan", data_id);
          await getHostsData();
          Swal.fire({
            title: 'Un-Ban Successful',
            icon: 'success',
            text: `The host ${hostName} has been successfully un-banned.`,
          });
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const ban = async (data_id, hostName) => {
    banConfirmation(
      'Are you sure?',
      `Do you want to ban the host ${hostName}?`,
      async () => {
        try {
          await postBlockHost(data_id);
          console.log("ban", data_id);
          await getHostsData();
          Swal.fire({
            title: 'Ban Successful',
            icon: 'success',
            text: `The host ${hostName} has been successfully banned.`,
          });
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  const TABLE_HEAD = ["No", "Profile", "Name", "Email", "PhoneNo", "Status", "Action"];

  return (
    <div className="mt-12 mr-[1.5rem] ml-[5.5rem] md:ml-24 md:w-[calc(100%-320px)]">
      <div>
    <h2 className="italic mb-4">Host details</h2>
        <div className="ml-auto">
          <Button color="blue" onClick={addHostPrompt}>Add host</Button>
        </div>

      </div>
      <div>
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
                {hostsData.map((data, index) => (
                  <TableRow key={data._id} sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add the box shadow style here
                  }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" className='w-60'>
                      <img src={data.image != null ? data.image : userProfile} className='w-12 h-12 ' alt={data.title} />

                    </TableCell>
                    <TableCell align="left">{`${data.firstName} ${data.lastName}`}</TableCell>
                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">{data.phoneNumber ? data.phoneNumber : "Google logged"}</TableCell>
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

    </div>
  );
}

export default Host;
