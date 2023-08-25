import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';

function Search() {
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();
  const handleSearchClick = () => {
    setShowInput(true);
  };
  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag`
      );
      const suggestions = response.data.features.map((feature) => ({
        location: feature.place_name,
        coordinates: feature.center,
      }));
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setLocation(value);
    fetchSuggestions(value);
  };


  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  // Function to disable dates before today
  const disablePastDates = (currentDate) => {
    const now = new Date();
    return currentDate < now;
  };

  //   // Function to disable dates before the check-in date
  const disableBeforeCheckIn = (currentDate) => {
    const checkInDateObject = new Date(checkInDate);
    return currentDate <= checkInDateObject;
  };


  const searchListingsByLocation = () => {
    try {
      const queryString = `?latitude=${latitude}&longitude=${longitude}&checkInDate=${checkInDate}&checkInOut=${checkOutDate}`;
      navigate(`/matchingListing${queryString}`);
    } catch (error) {

    }
  }

  const handle = (suggestion) => {
    setLocation(suggestion.location)
    setLatitude(suggestion.coordinates[1])
    setLongitude(suggestion.coordinates[0])
    setSuggestions([])
    console.log("hello", suggestion);
  }
  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {showInput ? (
        <div>
          <div className='hidden md:block'>
            <div className="  flex flex-row items-center">
              <div>
                <Input
                  type="text"
                  className="w-[22%] ml-3 px-4 py-1 text-sm outline-none"
                  placeholder="Location"
                  value={location}
                  onChange={handleSearchChange}
                />
              </div>
              <div></div>
              <label className="px-4 py-1 text-sm text-gray-600">Check-in</label>
              <input
                type="date"
                className="w-[22%] px-2 py-1 text-sm outline-none"
                value={checkInDate}
                onChange={handleCheckInDateChange}
                min={new Date().toISOString().split('T')[0]} // Disable past dates
              />
              <label className="px-4 py-1 text-sm text-gray-600">Check-out</label>
              <input
                type="date"
                className="w-[22%] px-2 py-1 text-sm outline-none"
                value={checkOutDate}
                onChange={handleCheckOutDateChange}
                min={checkInDate || new Date().toISOString().split('T')[0]} // Disable before check-in date
                disabled={!checkInDate} // Disable until check-in date is selected
              />
              <div
                className="p-2 bg-rose-500 rounded-full text-black"
                onClick={searchListingsByLocation}
              >
                <FaSearch size={18} />
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className='mx-3'>
              <Input type="text"  value={location}
                  onChange={handleSearchChange}/>
            </div>
            <div className='flex mx-4'>
              <div className='mt-3'>
                <label className="px-4 py-1 text-sm text-gray-600">Check-in</label>
                <input
                  type="date"
                  className="w-[54%] px-2 py-1 text-sm outline-none"
                  value={checkInDate}
                  onChange={handleCheckInDateChange}
                  min={new Date().toISOString().split('T')[0]} // Disable past dates
                />
              </div>
            </div>
            <div className='flex mx-4'>
              <div className='mt-3'>
                <label className="px-4 py-1 text-sm text-gray-600">Check-out</label>
                <input
                  type="date"
                  className="w-[50%] px-2 py-1 text-sm outline-none"
                  onChange={handleCheckOutDateChange}
                min={checkInDate || new Date().toISOString().split('T')[0]} // Disable before check-in date
                disabled={!checkInDate} // Disable until check-in date is selected
                />
              </div>
            </div>
            <div
                className="p-2 bg-rose-500  rounded-full text-black"
                onClick={searchListingsByLocation}
              >
                <FaSearch className='mx-auto' size={18} />
              </div>

          </div>
        </div>
      ) : (
        <div onClick={handleSearchClick} className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">Anywhere</div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            Anywhere
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add Guest</div>
            <div className="p-2 bg-rose-500 rounded-full text-black">
              <FaSearch size={18} />
            </div>
          </div>
        </div>
      )}
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg" style={{
          marginLeft: "21px", width: "29rem"
        }}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.location}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handle(suggestion)}
            >
              {suggestion.location}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default Search;
