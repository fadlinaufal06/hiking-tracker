import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { db } from "./firebase";
import "./App.css";
import Card from "./components/Card";
import { useEffect } from "react";
import { useState } from "react";
import { child, get, ref } from "firebase/database";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import LeafletMap from "./components/LeafletMap";
import Header from "./components/Header";

function App() {
  const [health, setHealth] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ta-iot.herokuapp.com/currentUserData");
        const data = await response.json();
        setHealth(data);
        console.log('fastapi', health)
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

  console.log("fastapi before", health);
  console.log("firebase before", data)

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

      <div className="MapContainer">
        <LeafletMap/>
      </div>
    </div>
  );
}

export default App;
