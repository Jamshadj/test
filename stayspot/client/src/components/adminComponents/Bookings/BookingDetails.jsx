import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getBookingById, getUserById } from '../../../api/adminApi';
import { getHostById, getListingById } from '../../../api/userApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import {TbMapPinCog} from 'react-icons/tb'
function BookingDetails() {
    const { bookingId } = useParams();
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState(null);
    const [user, setUser] = useState(null);
    const [host, setHost] = useState(null);
    const [listing, setListing] = useState(null);
    const navigate = useNavigate()
    const details = ((id) => {

        navigate(`/admin/properties/properties-details/${id}`)
    })
    const getBookingData = async () => {
        try {
            const response = await getBookingById(bookingId);
            setBookingData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookingData();
    }, [bookingId]);

    useEffect(() => {
        if (bookingData) {
            getUserById(bookingData.userId)
                .then(response => setUser(response.data))
                .catch(error => console.error(error));
        }
    }, [bookingData]);

    useEffect(() => {
        if (bookingData) {
            getListingById(bookingData.listingId)
                .then(response => setListing(response.data))
                .catch(error => console.error(error));
        }
    }, [bookingData]);

    useEffect(() => {
        if (listing) {
            getHostById(listing.hostId)
                .then(response => setHost(response.data))
                .catch(error => console.error(error));
        }
    }, [listing]);

    return (
        <div className="mt-12 md:ml-24 ml-8">
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                 <div className='md:flex pt-36'>
                        <div className='md:w-1/2'>
                        <div>
                        {listing && <img className='w-80  ml-9 h-96 md:ml-12 rounded' src={listing.images[0]} alt="" />}
                        </div>
                        <div className='mt-8 ml-12'>
                            <div>
                                <span className='text-2xl font-bold'>
                                    {listing && listing.title}
                                </span>
                            </div>
                            <div>
                                <span className='text-gray-500 mt-4'>
                                    <LocationOnIcon /> {listing && listing.location}
                                </span>
                            </div>
                            {listing && (
                                <div className='mt-6'>
                                    <Button color="blue" onClick={() => details(listing._id)} ripple="light" >View Details</Button>
                                </div>
                            )}
                        </div>
                        <div className='mt-8 ml-12'>
                            <span className='font-semibold'>Hosted By: {host && host.firstName}</span>
                        </div>
                    </div>
                    <div className='md:w-1/2'>
                        <div className='mt-8 ml-12 flex flex-col gap-6'>
                            <div className='font-semibold'>
                                Booked By: {user && user.firstName}
                            </div>
                            <div>
                                <DateRangeIcon /> Check In: {new Date(bookingData.checkInDate).toLocaleDateString()}
                            </div>
                            <div>
                                <DateRangeIcon /> Check Out: {new Date(bookingData.checkOutDate).toLocaleDateString()}
                            </div>
                            <div>
                                <DateRangeIcon /> Booking Date: {new Date(bookingData.bookingDate).toLocaleDateString()}
                            </div>
                            <div>
                                <PeopleAltIcon /> Number of Guests: {bookingData.guests}
                            </div>
                            <div>
                                <ModeNightIcon /> Number of Nights: {bookingData.numberOfNights}
                            </div>
                            <div>
                                <CurrencyExchangeIcon /> Total Amount: ${bookingData.totalAmount}
                            </div>
                            <div>
                                <MoreHorizIcon /> Status: {bookingData.status}
                            </div>
                        </div>
                        {listing && (
                            <div className='mt-8 ml-12 flex flex-col gap-6'>
                                <div className='font-semibold'>
                                    Address
                                </div>
                                <div>
                                    <span>
                                        House Number: {listing.address.houseNumber}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Street Address: {listing.address.streetAddress}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Area: {listing.address.area}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Landmark: {listing.address.landMark}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        City: {listing.address.city}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        State: {listing.address.region}
                                    </span>
                                </div>
                                <div className='flex'>
                                    <span>
                                    <TbMapPinCog/> 
                                    </span>
                                    <span>
                                      Pincode: {listing.address.postCode}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <PublicIcon /> Country: {listing.address.country}
                                    </span>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
                </div>
            )}
        </div>
    );
}

export default BookingDetails;
