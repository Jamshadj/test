import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { getListingById } from '../../../api/userApi';

function ReservationHistoryCard({ data}) {
    const [listing, setListing] = useState(null);

    useEffect(() => {
        // Fetch listing details based on the listing ID in the reservation data
        async function fetchListingDetails() {
            try {
                const response = await getListingById(data.listingId);
                if (response.data) {
                    setListing(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchListingDetails();
    }, [data.listingId]);

    const navigate = useNavigate();

    const navigateToRoomDetails = () => {
        // Assuming you want to navigate to reservation details using the booking ID
        navigate(`/host/reservationDetails/${data._id}`);
    };

    return (
        listing && (

        
            <div className="col-span-1 cursor-pointer group mx-2">
                <div className="flex flex-col gap-2 w-full">
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                        <img
                            className="object-cover h-full w-full group-hover:scale-110 transition"
                            src={listing.images[0]}
                            alt="Listing"
                        />
                    </div>
                    <div onClick={navigateToRoomDetails}>
                        <div className="font-semibold text-lg h-14">
                            {listing.title}
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <div className="font-semibold">
                                ₹ {data.totalAmount}   night
                            </div>
                        </div>
                            <div className="font-light ml-auto">{data.status}</div>
                    </div>
                </div>
            </div> 
        )
    );
}

export default ReservationHistoryCard;
