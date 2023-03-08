import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

interface IMap {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
}

interface IMarker {
    address: string;
    latitude: number;
    longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type GoogleInfoWindow = google.maps.InfoWindow;

const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false }) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();
    const [activeInfoWindow, setActiveInfoWindow] = useState<GoogleInfoWindow>();

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } else {
            addHomeMarker(map.getCenter());
        }
    };
    useEffect(startMap, [map]);

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(43.5276892, -5.6355573);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                initMap(4, new google.maps.LatLng(coords.latitude, coords.longitude))
            }, () => {
                initMap(4, defaultAddress);
            })
        } else {
            initMap(4, defaultAddress);
        }
    };

    const initEventListener = (): void => {
        if (map) {
            google.maps.event.addListener(map, 'click', function (e) {
                coordinateToAddress(e.latLng);
            })
        }
    };
    useEffect(initEventListener, [map]);

    const coordinateToAddress = async (coordinate: GoogleLatLng) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinate }, function (results, status) {
            if (status === 'OK') {
                let formatted_address = results[1] ? results[1].formatted_address : "Dirección desconocida";
                setMarker({
                    address: formatted_address,
                    latitude: coordinate.lat(),
                    longitude: coordinate.lng()
                })
            }
        });
    };

    useEffect(() => {
        if (marker) {
            addMarker(new google.maps.LatLng(marker.latitude, marker.longitude), marker.address);
        }
    }, [marker]);

    const addMarker = (location: GoogleLatLng, address: string): void => {
        const marker: GoogleMarker = new google.maps.Marker({
            position: location,
            map: map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: "<h1>" + address + "</h1>"
        });

        marker.addListener('click', () => {
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }

            infoWindow.open(map, marker);
            setActiveInfoWindow(infoWindow);
        });

    };

    const addHomeMarker = (location: GoogleLatLng): GoogleMarker => {
        const homeMarkerConst: GoogleMarker = new google.maps.Marker({
            position: location,
            map: map
        });

        homeMarkerConst.addListener('click', () => {
            map?.panTo(location);
            map?.setZoom(6);
        });

        return homeMarkerConst;
    };

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl: mapTypeControl,
                    streetViewControl: false,
                    rotateControl: false,
                    scaleControl: true,
                    fullscreenControl: false,
                    panControl: false,
                    zoomControl: true,
                    gestureHandling: 'cooperative',
                    mapTypeId: mapType,
                    draggableCursor: 'pointer',
                })
            );
        }
    };

    return (
        <div ref={ref} className="map"></div>
    );
};

export default Map;
