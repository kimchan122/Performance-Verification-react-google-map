import './App.css';
import React, { Component, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated";
import useWatchLocation from './hooks/useWatchLocation';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const containerStyle = {
  width: '400px',
  height: '400px'
};

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

function App() {

  const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);

  useEffect(() => {
    if (!location) return;
    
    // 3초후에 watch 종료
    setTimeout(() => {
      cancelLocationWatch();
    }, 300000);
  }, []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

  const [center, setCenter] = useState({lat: 0, lng: 0});

  const handleClick = () => {
    let temp = center;
    temp.lat = coords.latitude + 0.1;
    setCenter(temp);
  }

  useEffect(() => {
    if(coords !== undefined){
      let temp = center;
      temp.lat = coords.latitude;
      temp.lng = coords.longitude;
      setCenter(temp);
    }
  },[coords]);

  return (
    <div>
    <LoadScript
      googleMapsApiKey="AIzaSyDFBYtNS8t4OwleoxzH5chDB4nuwda0ypM"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {coords !== undefined ? <Marker position={center} /> : <></> }
      </GoogleMap>
    </LoadScript>
    <button onClick={() => handleClick()}>button</button>
    <div>{location.latitude, location.longitude}</div>
    </div>

  );

// return !isGeolocationAvailable ? (
//   <div>Your browser does not support Geolocation</div>
// ) : !isGeolocationEnabled ? (
//   <div>Geolocation is not enabled</div>
// ) : coords ? (
//   <table>
//       <tbody>
//           <tr>
//               <td>latitude</td>
//               <td>{coords.latitude}</td>
//           </tr>
//           <tr>
//               <td>longitude</td>
//               <td>{coords.longitude}</td>
//           </tr>
//           <tr>
//               <td>altitude</td>
//               <td>{coords.altitude}</td>
//           </tr>
//           <tr>
//               <td>heading</td>
//               <td>{coords.heading}</td>
//           </tr>
//           <tr>
//               <td>speed</td>
//               <td>{coords.speed}</td>
//           </tr>
//       </tbody>
//   </table>
// ) : (
//   <div>Getting the location data&hellip; </div>
// );
}

export default App;
