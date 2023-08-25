import React, { useEffect, useState } from 'react';
import axios from '../../../axios.js';
import { useSelector } from 'react-redux';
import { IoIosPower } from 'react-icons/io';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function ListingTable() {
  const { host } = useSelector((state) => state);
  const [properties, setProperties] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`/host/properties/${host.details._id}`);
        setProperties(response.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [host.details._id]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Listings
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Instant Book
            </th>
            <th scope="col" className="px-6 py-3">
              Bedrooms
            </th>
            <th scope="col" className="px-6 py-3">
              Beds
            </th>
            <th scope="col" className="px-6 py-3">
              Baths
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Price per night
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             <th onClick={() => navigate(`/host/manage-your-place/${property._id}/details`)} scope="row" style={{ display: "flex", alignItems: "center" }} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img src={property.images[0]} alt="" style={{ width: '100px', height: '100px' }} />
                <p style={{"font-size": "13px",
    "padding-left": "20px"}}>{property.title}</p>
              </th>
              <td className="px-6 py-4">
                {property.status === "inProgress" ? (
                  <>
                    <p>inProgress</p>
                    <AiOutlineClockCircle size={20} color="orange" />
                  </>
                ) : (
                  property.status
                )}
              </td>
              <td className="px-6 py-4">
                {property.instantBooking === "on" ? (
                  <IoIosPower size={20} color="green" />
                ) : (
                  <IoIosPower size={20} color="red" />
                )}
              </td>
              <td className="px-6 py-4">
                {property.floorPlan.find((plan) => plan.type === 'Bedrooms')?.count || 0}
              </td>
              <td className="px-6 py-4">
                {property.floorPlan.find((plan) => plan.type === 'Beds')?.count || 0}
              </td>
              <td className="px-6 py-4">
                {property.floorPlan.find((plan) => plan.type === 'Bathroom')?.count || 0}
              </td>
              <td className="px-6 py-4">
                {property.location}
              </td>
              <td className="px-6 py-4">
                {property.pricePerNight}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListingTable;
