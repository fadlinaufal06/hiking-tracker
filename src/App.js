import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { db } from "./firebase";
import "./App.css";
import Card from "./components/Card";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { child, get, ref, onValue } from "firebase/database";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import LeafletMap from "./components/LeafletMap";
import Header from "./components/Header";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useContext } from "react";
import { PositionContext } from "./components/PositionContext";
import UserPopup from "./components/UserPopup";
import "tailwindcss/tailwind.css";
import { ConditionContext } from "./components/ConditionContext";
import { PredictionContext } from "./components/PredictionContext";

function App() {
  const [currentPosition] = useContext(PositionContext)
  const [currentCondition, setCondition] =  useContext(ConditionContext)
  const [currentPrediction, setPrediction] = useContext(PredictionContext)
  const [health, setHealth] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    const databaseRef = ref(db, "userdata");
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setData(userData);
      } else {
        console.log("No data available");
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);



  return (
    <div className="flex h-screen">
      <div className="w-1/5 h-screen overflow-auto sticky top-0">
        <div>
          <Header/>
        </div>
        {Object.entries(data).map(([id, health]) => (
          <Card
            id={id} 
            health={health} 
          />
        ))}
      </div>

    <MapContainer center={currentPosition} zoom={20} className="flex-1">
      <Marker position={currentPosition}>
        <Popup>
          <UserPopup/>
        </Popup>
      </Marker>
      <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
      <LeafletMap/>
    </MapContainer>

    </div>
  );
}

export default App;
