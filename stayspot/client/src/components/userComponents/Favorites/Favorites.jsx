import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import Navbar from '../Navbar/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getListingById, getWishlist } from '../../../api/userApi';
import HeartButton from '../ListingCard/HeartButton';

function Favorites() {
  const { user } = useSelector((state) => state);
  const [wishlist, setWishlist] = useState([]); // Store the wishlist IDs
  const [wishlistDetails, setWishlistDetails] = useState([]); // Store the listing details
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist(user.details._id);
      setWishlist(response.data.wishlist);

      const listingDetails = await Promise.all(
        response.data.wishlist.map(async (itemId) => {
          const listingResponse = await getListingById(itemId);
          return listingResponse.data;
        })
      );
      setWishlistDetails(listingDetails); // Store the listing details
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const removeFromWishlist = (listingId) => {
    setWishlistDetails((prevDetails) => prevDetails.filter((item) => item._id !== listingId));
    setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== listingId));
  };

  const navigateToDetails = (listingId) => {
    navigate(`/rooms/${listingId}`);
  };

  return (
    <div>
      <Navbar reservation="reservation" />
      <div className="pt-24">
        {loading ? (
          <div className="flex justify-center mt-8">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <div className="m-10" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
            {wishlistDetails.length === 0 ? (
              <Typography className="text-center mt-4">Your wishlist is empty.</Typography>
            ) : (
              wishlistDetails.map((item) => (
                <Card className="w-96" key={item._id}>
                  <CardHeader color="blue-gray" className="relative h-56">
                    {item.images && item.images[0] && <img src={item.images[0]} alt="card-image" />}
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {item.title || 'Title not available'}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0 flex">
                    <Button onClick={() => navigateToDetails(item._id)}>Show more</Button>
                    <div className="ml-auto">
                      <HeartButton
                        listingId={item._id}
                        currentUser={user}
                        favorites={true}
                        updateWishlist={removeFromWishlist} // Pass the callback function
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
