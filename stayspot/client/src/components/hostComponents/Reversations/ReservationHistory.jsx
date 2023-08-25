import { useSelector } from "react-redux";
import { getBookingByHostId } from "../../../api/hostApi";
import { useEffect, useState } from "react";
import Navbar from "../HostNavBar/HostNavbar";
import ReservationHistoryCard from "./ReservationHistoryCard";

function ReservationHistory() {
  const { host } = useSelector((state) => state);
  const [bookingData, setBookingData] = useState([]);
  const getBookingData = async () => {
    try {
      const response = await getBookingByHostId(host.details._id);
      setBookingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookingData();
  }, [host.details._id]);

  return (
    <div>
      <Navbar />
      <div className=''>
        <h2 className='text-left mb-4 font-bold text-xl'>Latest Bookings</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {bookingData.length === 0 ? (
            <p>No bookings.</p>
          ) : (
            bookingData.map((booking) => (
              <ReservationHistoryCard key={booking.id} data={booking}  />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationHistory;
