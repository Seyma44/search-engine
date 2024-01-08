
import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import customMarkerIcon from '../assets/tesodev-logo.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = () => {

  const [coordinates, setCoordinates] = useState([41.01477,29.00116]); //Istanbul Coordinates

  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = encodeURIComponent("Davutpaşa, Çifte Havuzlar Mahallesi, Esenler, İstanbul, Marmara Bölgesi, 34220, Türkiye"); //tesodev coordinates 41.019135, 28.890948
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);

        if (response.data.length > 0) {
          const location = response.data[0];
          setCoordinates([parseFloat(location.lat), parseFloat(location.lon)]);
        } else {
          console.error('No results found for the address');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchData();
  }, []);

  //  a custom marker tesodev icon 
  const customIcon = new L.Icon({
    iconUrl: customMarkerIcon,
    iconSize: [62, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], // Popup anchor point
  });

  return (
    <MapContainer center={coordinates} zoom={10} style={{ width: '100%', height: '230px' }}>
      <TileLayer
        data-testid="custom-tile-layer"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={customIcon}>
        <Popup>Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;

