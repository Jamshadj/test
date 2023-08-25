import axios from 'axios';

export async function fetchLocationData(listingCoordinates) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${listingCoordinates.longitude},${listingCoordinates.latitude}.json`,
      {
        params: {
          access_token: 'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag',
        },
      }
    );
    return response.data.features[0];
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}
