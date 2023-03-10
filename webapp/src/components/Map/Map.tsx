import './Map.css';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { MarkerContext } from '../../context/MarkerContextProvider';
import { IPMarker } from '../../shared/shareddtypes';

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
    const { state: markers } = useContext(MarkerContext);
    const [lastAddedCouple, setLastAddedCouple] = useState<ICouple>();

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } else {
            initEventListener();
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
        google.maps.event.addListener(map!, 'click', function (e) {
            props.setGlobalLat(e.latLng.lat());
            props.setGlobalLng(e.latLng.lng());

            setMarker({
                latLng: e.latLng,
                name: formatName(),
                description: formatDescription(),
            })
        })
    };

    const formatName = (): string => {
        return props.globalName ? props.globalName : "Sin nombre";
    }

    const formatDescription = (): string => {
        return props.globalDescription ? props.globalDescription : "Sin descripci??n";
    }

    const addMarker = (iMarker: IMarker): void => {
        if (lastAddedCouple) {
            lastAddedCouple.marker.setMap(null);
        }

        setLastAddedCouple(generateMarker(iMarker));
    };

    useEffect(() => {
        if (marker) {
            addMarker(marker);
        }
    }, [marker]);


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

    useEffect(() => {
        let location = new google.maps.LatLng(props.globalLat, props.globalLng);

        if (lastAddedCouple) {
            lastAddedCouple.marker.setPosition(location);
        } else {
            addMarker({
                latLng: location,
                name: formatName(),
                description: formatDescription(),
            })
        }
    }, [props.globalLat, props.globalLng]);

    useEffect(() => {
        if (lastAddedCouple) {
            lastAddedCouple.infoWindow.setContent(`<h1>${formatName()}</h1><p>${formatDescription()}</p>`);
        }
    }, [props.globalName, props.globalDescription]);

    useEffect(() => {
        if (lastAddedCouple && props.acceptedMarker) {
            lastAddedCouple.marker = new google.maps.Marker();
            props.setAcceptedMarker(false);
        }
    }, [props.acceptedMarker]);

    useEffect(() => {
        addMarkers(markers.map(parseMarker));
    }, [markers]);

    const parseMarker = (iPMarker: IPMarker): IMarker => {
        return {
            name: iPMarker.name,
            description: iPMarker.description,
            latLng: new google.maps.LatLng(iPMarker.lat, iPMarker.lng)
        };
    }

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
