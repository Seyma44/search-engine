import React from 'react';
import MapComponent from './MapComponent';
import imageFooter from '../assets/footer-image.png';
import 'leaflet/dist/leaflet.css';
import '../styles/Footer.scss'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left side */}
        <img src={imageFooter} alt="Footer" className="footer-image" />
        <div className="contact-info">
          <div className="contact-section">
            <div className="contact-title">İletişim</div>
            <div className="address">
              Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
            </div>
            <strong><p className="email">Email: bilgi@tesodev.com</p></strong>
          </div>
        </div>
        {/* Right side - Map Embed */}
        <div className="map-container">
          <MapComponent />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
