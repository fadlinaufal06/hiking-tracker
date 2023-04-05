import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  const routingControlRef = useRef(null);

  let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [90, 90],
  });

  const removeLastMarker = () => {
    const waypoints = routingControlRef.current.getWaypoints();
    if (waypoints.length > 2) {
      map.removeLayer(waypoints[waypoints.length - 2].marker);
      routingControlRef.current.spliceWaypoints(
        waypoints.length - 2,
        1,
        waypoints[0].latLng
      );
    }
  };

  useEffect(() => {
    var marker1 = L.marker([-6.884832, 107.613805], { icon: DefaultIcon }).addTo(
      map
    );
    map.on("click", function (e) {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(-6.884832, 107.613805),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        lineOptions: {
          styles: [
            {
              color: "blue",
              weight: 4,
              opacity: 0.7,
            },
          ],
        },
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
      })
        .on("routesfound", function (e) {
          e.routes[0].coordinates.forEach((c, i) => {
            setTimeout(() => {
              marker1.setLatLng([c.lat, c.lng]);
            }, 1000 * i);
          });
        })
        .addTo(map);
    });
  }, []);

  return (
    <div>
      <button onClick={removeLastMarker}>Remove Waypoint</button>
    </div>
  );
};

export default LeafletRoutingMachine;
