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

function App() {

  const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);

  useEffect(() => {
    console.log(location);
    if (!location) return;
    
    setTimeout(() => {
      cancelLocationWatch();
    }, 3000);
  }, []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

  const [center, setCenter] = useState({lat: 0, lng: 0});

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
        {coords !== undefined ? <Marker position={center} /> : <></> }
      </GoogleMap>
    </LoadScript>
    {location!==undefined ? <div>{location.latitude}, {location.longitude}</div> : <></> }
    </div>
  );
}

export default App;
