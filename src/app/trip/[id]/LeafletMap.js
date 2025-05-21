"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

function FitBounds({ coords }) {
    const map = useMap();

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconUrl: "/leaflet/marker-icon.png",
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        shadowUrl: "/leaflet/marker-shadow.png",
    });

    useEffect(() => {
        if (coords.length >= 2) {
            const bounds = L.latLngBounds(coords);
            map.fitBounds(bounds, { padding: [40, 40] });
        }
    }, [coords, map]);

    return null;
}

export default function LeafletMap({ startCoords, endCoords }) {
    const coords = [startCoords, endCoords];

    return (
        <div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
            <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={startCoords}
                zoom={12}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={startCoords}>
                    <Popup>Punkt startowy</Popup>
                </Marker>
                <Marker position={endCoords}>
                    <Popup>Punkt końcowy</Popup>
                </Marker>
                <FitBounds coords={coords} />
            </MapContainer>
        </div>
    );
}
