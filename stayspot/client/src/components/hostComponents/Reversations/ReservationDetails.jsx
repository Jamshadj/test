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

import HostNavbar from '../../hostComponents/HostNavBar/HostNavbar';
import { updateBookingStatus } from '../../../api/hostApi';

function ReservationDetails() {

    const { bookingId } = useParams();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState(null);
    const [host, setHost] = useState(null);
    const [listing, setListing] = useState(null);
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
    const [statusChanged, setStatusChanged] = useState(false); // To track status changes

    const handleCheckIn = async () => {
        try {
            await updateBookingStatus(bookingId, "Checkin completed",host._id);
            setStatusChanged(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckOut = async () => {
        try {
            await updateBookingStatus(bookingId, "CheckOut completed",host._id);
            setStatusChanged(true);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getBookingData();
    }, [bookingId, statusChanged]); // Trigger re-fetching if statusChanged changes

    return (
        <div>
            <div>
                <HostNavbar/>
            </div>
            {loading ? (
                <CircularProgress />
            ) : (
                <div >
                    <div className='md:flex pt-20'>
                        <div className='md:w-1/2'>
                            <div>
                                {listing && <img className='md:w-96 w-[19rem] h-96 ml-12 rounded' src={listing.images[0]} alt="" />}
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
                            </div>
                            <div className='mt-8 ml-12'>
                                <span className='font-semibold'>Hosted By: {host && host.firstName}</span>
                            </div>
                            {/* <div className='mt-8 ml-12'>
                                <span className='font-semibold'>Contact : {host && host.phoneNumber}</span>
                            </div> */}
                        </div>
                        <div className='md:w-1/2 '>
                            <div className='mt-8 mb-5 ml-12 flex flex-col gap-6'>
                                <div className='font-semibold'>
                                    Details
                                </div>
                                <div className='font-semibold'>
                                    Booked By: {user && user.firstName}
                                    
                                </div>
                                <div className='font-semibold'>
                                   PhoneNumber: {user && user.phoneNumber}
                                    
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
                                {bookingData.checkInDate.slice(0, 10) === new Date().toISOString().slice(0, 10) &&
                                    bookingData.status === 'Booked' && (
                                        <Button
                                            color="blue"
                                            onClick={handleCheckIn}
                                        >
                                            Check In
                                        </Button>
                                    )}
                                {bookingData.checkOutDate.slice(0, 10) === new Date().toISOString().slice(0, 10) &&
                                    bookingData.status === 'Checkin completed' && (
                                        <Button
                                            color="green"
                                            onClick={handleCheckOut}
                                        >
                                            Complete
                                        </Button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReservationDetails;
