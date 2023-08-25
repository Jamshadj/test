import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({ center }) => {
  console.log('center', center);

  const mapCenter = center ? L.latLng(center.latitude, center.longitude) : L.latLng(51, -0.09);

  return (
    <MapContainer center={mapCenter} zoom={center ? 4 : 2} scrollWheelZoom={false} className="h-[35vh] rounded-lg">
      <TileLayer url={url} attribution={attribution} />
      {center && <Marker position={mapCenter} icon={customIcon} />}
    </MapContainer>
  );
};

export default Map;
