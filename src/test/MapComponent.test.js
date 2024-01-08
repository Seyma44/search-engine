import React from 'react'; 
import { render, screen, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import MockAdapter from 'axios-mock-adapter';
import MapComponent from '../components/MapComponent';

const mock = new MockAdapter(mockAxios);

const mockResponse = [
  {
    lat: '41.019135',
    lon: '28.890948',
  },
];

test('renders MapComponent with coordinates from the API', async () => {
  // Mock the axios request to simulate the API response
  mock.onGet(/.*/).reply(200, mockResponse);

  render(<MapComponent />);

 
  await waitFor(() => {
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });
  

  const tileLayer = screen.getByTestId('custom-tile-layer');
  expect(tileLayer).toBeInTheDocument();


  // Marker is rendered with the customIcon
  const marker = screen.getByTestId('custom-marker');
  expect(marker).toBeInTheDocument();

  // Popup content is rendered
  const popupContent = screen.getByText(/Çifte Havuzlar Mah/i);
  expect(popupContent).toBeInTheDocument();
});

// Cleanup mock adapter after all tests
afterAll(() => {
  mock.restore();
});
