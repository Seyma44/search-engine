import React from 'react'; 
import * as ReactLeafletOriginal from 'react-leaflet';

const mockMapContainer = jest.fn((props) => <div data-testid="map-container" {...props} />);
const mockTileLayer = jest.fn((props) => <div role="img" {...props} />);
const mockMarker = jest.fn((props) => <div data-testid="custom-marker" {...props} />);
const mockPopup = jest.fn((props) => <div {...props} />);

const originalUseMap = ReactLeafletOriginal.useMap;
const originalUseMapEvent = ReactLeafletOriginal.useMapEvent;
const originalUseMapEvents = ReactLeafletOriginal.useMapEvents;

export {
  mockMapContainer as MapContainer,
  mockTileLayer as TileLayer,
  mockMarker as Marker,
  mockPopup as Popup,
  originalUseMap as useMap,
  originalUseMapEvent as useMapEvent,
  originalUseMapEvents as useMapEvents,
};

export default ReactLeafletOriginal;
