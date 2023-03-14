import './App.css';
import React, {useState} from 'react';
import "leaflet/dist/leaflet.css"
import "./App.css"

import { MapContainer, TileLayer } from 'react-leaflet';
import MyMap from './components/MyMap';



function App() {
  return (
 
  // <MapContainer center={[51.505, -0.09]} zoom={13}>
  //   <TileLayer
  //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //   />
  // </MapContainer>
  

  <MyMap route={[
        [51.505, -0.09],
        [51.507, -0.08],
        [51.51, -0.06],
        [51.513, -0.05],
        [51.515, -0.045],
      ]}/>

  );
}

export default App;
 //   <div className="App">
  //     <Sidebar/>
  //     <MyMap
  //     route={[
  //       [51.505, -0.09],
  //       [51.507, -0.08],
  //       [51.51, -0.06],
  //       [51.513, -0.05],
  //       [51.515, -0.045],
  //     ]}
  //   />
  // </div>