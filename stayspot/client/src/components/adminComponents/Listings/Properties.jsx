import React, { useEffect, useState } from 'react';
import { getProperties } from '../../../api/adminApi';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
 
// import Button from '@mui/material/Button'; // Don't forget to import Button component

function Properties() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    getProperties()
      .then((response) => {
        setProperties(response.data)
        setLoading(false);; // Assuming the API response is an array of properties
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const TABLE_HEAD = ["No", "Property", "Title", "Location", "Structure", "PricePerNight", "Status", "Details"];

  const navigateToDetails = (propertyId) => {
    navigate(`properties-details/${propertyId}`)
  };

  return (
    <div className="mt-12 mr-[1.5rem] ml-[5.5rem] md:ml-24 md:w-[calc(100%-320px)]">
    <h2 className="italic mb-4">Property details</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {properties.map((data, index) => (
              <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left" className='w-60'>
                  <img  src={data.images[0]} className='w-28 h-28 ml-9' alt={data.title} />
                </TableCell>
                <TableCell align="left">{data.title}</TableCell>
                <TableCell align="left">{data.location}</TableCell>
                <TableCell align="left">{data.structure}</TableCell>
                <TableCell align="left">₹{data.pricePerNight}</TableCell>
                <TableCell align="left">{data.status}</TableCell>
                <TableCell align="left">
                  <Button color="blue" onClick={() => navigateToDetails(data._id)}>View details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Properties;
