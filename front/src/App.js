import './App.css';
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function App() {


  // return (
  //   <LoadScript
  //     googleMapsApiKey="AIzaSyDFBYtNS8t4OwleoxzH5chDB4nuwda0ypM"
  //   >
  //     <GoogleMap
  //       mapContainerStyle={containerStyle}
  //       center={center}
  //       zoom={10}
  //     >
  //       { /* Child components, such as markers, info windows, etc. */ }
  //       <></>
  //     </GoogleMap>
  //   </LoadScript>
  // );

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

return !isGeolocationAvailable ? (
  <div>Your browser does not support Geolocation</div>
) : !isGeolocationEnabled ? (
  <div>Geolocation is not enabled</div>
) : coords ? (
  <table>
      <tbody>
          <tr>
              <td>latitude</td>
              <td>{coords.latitude}</td>
          </tr>
          <tr>
              <td>longitude</td>
              <td>{coords.longitude}</td>
          </tr>
          <tr>
              <td>altitude</td>
              <td>{coords.altitude}</td>
          </tr>
          <tr>
              <td>heading</td>
              <td>{coords.heading}</td>
          </tr>
          <tr>
              <td>speed</td>
              <td>{coords.speed}</td>
          </tr>
      </tbody>
  </table>
) : (
  <div>Getting the location data&hellip; </div>
);
}

export default App;
