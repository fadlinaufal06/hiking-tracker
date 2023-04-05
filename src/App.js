import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import { db } from "./firebase";
import "./App.css";
import LeafletRoutingMachine from "./components/LeafletRoutingMachine";
import Card from "./components/Card";
import { useEffect } from "react";
import { useState } from "react";
import { child, get, ref } from "firebase/database";

function App() {
  const position = [-6.893215, 107.610277];
  const [health, setHealth] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ta-iot.herokuapp.com/");
        const data = await response.json();
        setHealth(data);
        // console.log('fastapi', health)
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `userdata/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log("fastapi", health);
  console.log(
    "firebase",
    Object.entries(data),
    Object.entries(data).map(([id, health]) => [
      id,
      health.predict[
        Object.keys(health.predict).sort((a, b) => (a > b ? -1 : 1))[0]
      ],
    ])
  );




  return (
    <div className="container">
      <div className="sidebar">
        {Object.entries(data).map(([id, health]) => (
          <Card id={id} health={health} />
        ))}
      </div>
      <div className="MapContainer">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <LeafletRoutingMachine />
        </MapContainer>
      </div>
    </div>
  );
}
let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default App;
