import React from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarker } from "react-icons/fa";

import airports from "../services/airports.json";

import styles from "../styles/FlightMap.module.css";

interface IMapProps {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

interface IMapState {}

export class FlightMap extends React.Component<IMapProps, IMapState> {
    constructor(props: IMapProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact options={{ styles: mapStyle }} bootstrapURLKeys={{ key: "AIzaSyBMfeS0ukQm-XQWx12jpFY-pqQ0CxUYDI8" }} defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
                    {airports
                        .filter((_) => Math.random() > 0.92)
                        .map((c) => (
                            <FaMapMarker lat={c.lat} lng={c.lng} text="Marker" style={{ fontSize: "15px" }} />
                        ))}

                    {
                        // ||     ||
                        // \/ FER \/
                    }
                    <FaMapMarker lat={45.742931} lng={16.068778} text="Marker" style={{ fontSize: "15px" }} />

                    <FaMapMarker lat={43.538944} lng={16.297964} text="Marker" style={{ fontSize: "15px" }} />
                    <FaMapMarker lat={42.561353} lng={18.268244} text="Marker" style={{ fontSize: "15px" }} />
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#f5f5f5",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#f5f5f5",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#bdbdbd",
            },
        ],
    },
    {
        featureType: "administrative.neighborhood",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#e5e5e5",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.arterial",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#dadada",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "road.local",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
            {
                color: "#e5e5e5",
            },
        ],
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "transit.station.airport",
        stylers: [
            {
                saturation: -5,
            },
            {
                lightness: 10,
            },
            {
                visibility: "on",
            },
            {
                weight: 8,
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#c9c9c9",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
];
