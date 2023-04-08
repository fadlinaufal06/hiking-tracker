import React, { useContext, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder"; // Import the Leaflet Control Geocoder library
import { PositionContext } from "./PositionContext";

const LeafletMap = () => {
    const [currentPosition] = useContext(PositionContext)
  useEffect(() => {
    const map = L.map("map").setView(currentPosition, 20);

    const popup = L.popup()
      .setContent("Popup Content");

    L.marker(currentPosition)
      .addTo(map)
      .bindPopup(popup)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    const createButton = (label, container) => {
      const btn = L.DomUtil.create("button", "", container);
      btn.setAttribute("type", "button");
      btn.innerHTML = label;
      return btn;
    };

    const startBtn = createButton("Start from this location");
    const destBtn = createButton("Go to this location");

    map.on("click", function(e) {
      const container = L.DomUtil.create("div"),
        startBtn = createButton("Start from this location", container),
        destBtn = createButton("Go to this location", container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

      L.DomEvent.on(startBtn, "click", function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, "click", function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
      });
    });

    const ReversablePlan = L.Routing.Plan.extend({
      createGeocoders: function() {
        const container = L.Routing.Plan.prototype.createGeocoders.call(this),
          reverseButton = createButton("↑↓", container);
        return container;
      }
    });

    const plan = new ReversablePlan(
      [L.latLng(), L.latLng()],
      {
        geocoder: L.Control.Geocoder.nominatim(), // Use L.Control.Geocoder.nominatim() from the imported library
        routeWhileDragging: true
      }
    );

    const control = L.Routing.control({
      routeWhileDragging: true,
      plan: plan
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [currentPosition]);

  return <div id="map" style={{ height: "100%" }}></div>;
};

export default LeafletMap;
