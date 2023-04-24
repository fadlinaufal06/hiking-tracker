import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder"; // Import the Leaflet Control Geocoder library
import { PositionContext } from "./PositionContext";
import ReactDOMServer from "react-dom/server";
import UserPopup from "./UserPopup";
import { ConditionContext } from "./ConditionContext";
import { useMapEvent } from "react-leaflet";


const createButton = (label, container) => {
  const btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
};

const ReversablePlan = L.Routing.Plan.extend({
  createGeocoders: function() {
    const container = L.Routing.Plan.prototype.createGeocoders.call(this),
      reverseButton = createButton("↑↓", container);
    return container;
  }
});


const LeafletMap = () => {
  const [currentPosition] = useContext(PositionContext)
  const [latestPredict] = useContext(ConditionContext)

  const [control, setControl] = useState(L.Routing.control({
    routeWhileDragging: true,
    plan: new ReversablePlan(
      [L.latLng(), L.latLng()],
      {
        geocoder: L.Control.Geocoder.nominatim(), // Use L.Control.Geocoder.nominatim() from the imported library
        routeWhileDragging: true
      }
    ),
  }))

  const oldCOntrol = useRef()

  
  const map = useMapEvent('click', function(e) {
    const container = L.DomUtil.create("div"),
      startBtn = createButton("Start from this location", container),
      destBtn = createButton("Go to this location", container);
     
      control.addTo(map)

    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);

    L.DomEvent.on(startBtn, "click", function() {
      control.spliceWaypoints(0, 1, e.latlng);
      map.closePopup();
      L.marker(e.latlng).addTo(map).removeFrom(map)
    });

    L.DomEvent.on(destBtn, "click", function() {
      control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
      map.closePopup();
     L.marker(e.latlng).addTo(map).removeFrom(map)
    });
  });

  useEffect(function(){
    map.setView(currentPosition,map.getZoom())
    setControl(L.Routing.control({
      routeWhileDragging: true,
      plan: new ReversablePlan(
        [L.latLng(), L.latLng()],
        {
          geocoder: L.Control.Geocoder.nominatim(), // Use L.Control.Geocoder.nominatim() from the imported library
          routeWhileDragging: true
        }
      ),
    }))
  },[currentPosition])

  useEffect(function(){
    if(oldCOntrol.current){
      oldCOntrol.current.remove()
    }
    oldCOntrol.current = control
  },[control])

  return <div id="map" style={{ height: "100%" }}></div>;
};

export default LeafletMap;
