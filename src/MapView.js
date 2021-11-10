import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import IconLocation from "./images/icon-location.svg";
import { useGlobalContext } from "./context";

const customIcon = L.icon({
  iconUrl: IconLocation,
  iconRetinaUrl: IconLocation,
});

const MapView = () => {
  let position = [37.38605, -122.08385];
  const { addressData } = useGlobalContext();

  if (addressData) {
    position = [addressData.lat, addressData.lng];
  }

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;