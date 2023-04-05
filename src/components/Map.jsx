import React from "react";
import { MapContainer, TileLayer, LayerGroup } from "react-leaflet";
import Routing from "./LeafletRoutingMachine";

class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: -7.453239,
      lng: 110.433131,
      zoom: 7,
    };
  }

  render() {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    return (
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayerGroup>
          <Routing />
        </LayerGroup>
      </MapContainer>
    );
  }
}

export default MapComponent;
