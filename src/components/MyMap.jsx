import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "../App.css"
import "./Map.css"
import Sidebar from "./Sidebar";

const MyMap = () => {
  const [position, setPosition] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (position) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const distance = position.distanceTo([pos.coords.latitude, pos.coords.longitude]);
        if (distance > 1000) {
          setAlert(true);
        } else {
          setAlert(false);
        }
      });
    }
  }, [position]);

  const handleMapClick = (e) => {
    setPosition(e.latlng);
  };

  return (
    <div> 
      <Sidebar/>
      <MapContainer center={[51.505, -0.09]} zoom={13} onClick={handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
      {alert && <div>Warning: You are outside the map route</div>}
    </div>
  );
};

export default MyMap;