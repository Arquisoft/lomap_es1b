import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

interface IMarker {
    name: string;
    description: string;
    latLng: GoogleLatLng;
}

interface ICouple {
    marker: GoogleMarker;
    infoWindow: GoogleInfoWindow;
}

type GoogleMap = google.maps.Map;
type GoogleLatLng = google.maps.LatLng;
type GoogleMarker = google.maps.Marker;
type GoogleInfoWindow = google.maps.InfoWindow;

interface IMapProps {
    globalLat: number;
    globalLng: number;
    globalName: string;
    acceptedMarker: boolean;
    mapTypeControl?: boolean;
    globalDescription: string;
    mapType: google.maps.MapTypeId;
    setGlobalLat: (globalLat: number) => void;
    setGlobalLng: (globalLng: number) => void;
    setAcceptedMarker: (acceptedMarker: boolean) => void;
}

const Map: React.FC<IMapProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();
    const [lastAddedCouple, setLastAddedCouple] = useState<ICouple>();

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } else {
            initEventListener();
            addHomeMarker(map.getCenter());
            addMarkers([{ name: "NPrueba_1", description: "DPrueba_1", latLng: new google.maps.LatLng(10, 10) },
            { name: "NPrueba_2", description: "DPrueba_2", latLng: new google.maps.LatLng(20, 20) }]);
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

    const addHomeMarker = (location: GoogleLatLng): void => {
        const homeMarkerConst: GoogleMarker = new google.maps.Marker({
            position: location,
            map: map
        });

        homeMarkerConst.addListener('click', () => {
            map?.panTo(location);
            map?.setZoom(6);
        });
    };

    const addMarkers = (iMarkers: IMarker[]): void => {
        iMarkers.forEach((marker) => {
            generateMarker(marker);
        });
    }

    const initEventListener = (): void => {
        google.maps.event.addListener(map!, 'click', function (e) {
            coordinateToAddress(e.latLng);
        })

    };

    const coordinateToAddress = async (coordinate: GoogleLatLng) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinate }, function (results, status) {
            if (status === 'OK') {
                setMarker({
                    name: "",
                    description: "",
                    latLng: new google.maps.LatLng(coordinate.lat(), coordinate.lng()),
                })
            }
        });
    };

    const addMarker = (iMarker: IMarker): void => {
        if (lastAddedCouple) {
            if (props.acceptedMarker) {
                lastAddedCouple.marker = new google.maps.Marker();
                props.setAcceptedMarker(false);
            }
            lastAddedCouple.marker.setMap(null);
        }

        props.setGlobalLat(iMarker.latLng.lat());
        props.setGlobalLng(iMarker.latLng.lng());
        setLastAddedCouple(generateMarker(iMarker));
    };

    const generateMarker = (notAddedMarker: IMarker): ICouple => {
        const marker: GoogleMarker = new google.maps.Marker({
            position: notAddedMarker.latLng,
            map: map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h1>${notAddedMarker.name}</h1>
            <p>${notAddedMarker.description}</p>`
        })

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        return { marker, infoWindow };
    }

    useEffect(() => {
        if (marker) {
            marker.name = formatName();
            marker.description = formatDescription();

            addMarker(marker);
        }
    }, [marker]);

    const formatName = (): string => {
        return props.globalName ? props.globalName : "Sin nombre";
    }

    const formatDescription = (): string => {
        return props.globalDescription ? props.globalDescription : "Sin descripción";
    }

    useEffect(() => {
        let location = new google.maps.LatLng(props.globalLat, props.globalLng);

        if (lastAddedCouple) {
            lastAddedCouple.marker.setPosition(location);
        } else {
            coordinateToAddress(location);
        }
    }, [props.globalLat, props.globalLng]);

    useEffect(() => {
        if (lastAddedCouple) {
            lastAddedCouple.infoWindow.setContent(`<h1>${formatName()}</h1><p>${formatDescription()}</p>`);
        }
    }, [props.globalName, props.globalDescription]);

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    panControl: false,
                    zoomControl: true,
                    scaleControl: true,
                    rotateControl: false,
                    mapTypeId: props.mapType,
                    streetViewControl: false,
                    fullscreenControl: false,
                    draggableCursor: 'pointer',
                    gestureHandling: 'cooperative',
                    mapTypeControl: props.mapTypeControl,
                })
            );
        }
    };

    return (
        <div ref={ref} className="map"></div>
    );
};

export default Map;
