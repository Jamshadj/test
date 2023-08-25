import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag';

function MapboxComponent({ locations }) {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [locations[0]?.coordinates.longitude, locations[0]?.coordinates.latitude], // Center on the first location
      zoom: 10,
    });

    // Add markers for each location with price labels
    locations.forEach((location) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.coordinates.longitude, location.coordinates.latitude])
        .addTo(map);

      // Create a div element for the price label
      const priceLabel = document.createElement('div');
      priceLabel.className = 'marker-price-label font-bold';
      priceLabel.textContent = `$${location.pricePerNight}`;

      // Add the price label to the marker
      marker.getElement().appendChild(priceLabel);

       marker.getElement().addEventListener('click', () => {
        // Navigate to the location's room using its ID
        window.location.href = `/rooms/${location._id}`;
      });
    });

    return () => map.remove();
  }, [locations]);

  return<div id="map" className="map-container mb-4 mt-6 sm:mb-0 md:m-10 h-[30rem]" />;

}

export default MapboxComponent;
