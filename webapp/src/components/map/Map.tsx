import './Map.css';
import { IPMarker } from '../../shared/SharedTypes';
import { MarkerContext, Types } from '../../context/MarkerContextProvider';
import React, { useEffect, useRef, useState, useContext } from 'react';

interface IMarker {
    name: string;
    address: string;
    category: string;
    description: string;
    latLng: GoogleLatLng;
}

interface ICouple {
    marker: GoogleMarker;
    infoWindow: GoogleInfoWindow;
}

type MarkerMap = {
    [id: number]: ICouple;
}

type GoogleMap = google.maps.Map;
type GoogleLatLng = google.maps.LatLng;
type GoogleMarker = google.maps.Marker;
type GoogleInfoWindow = google.maps.InfoWindow;

interface IMapProps {
    globalLat: number;
    globalLng: number;
    seleccion: string;
    globalName: string;
    globalAddress: string;
    globalCategory: string;
    acceptedMarker: boolean;
    mapTypeControl?: boolean;
    globalDescription: string;
    mapType: google.maps.MapTypeId;
    setGlobalLat: (globalLat: number) => void;
    setGlobalLng: (globalLng: number) => void;
    setGlobalAddress: (globalAddress: string) => void;
    setAcceptedMarker: (acceptedMarker: boolean) => void;
}

const Map: React.FC<IMapProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const markerHashMap = useRef<MarkerMap>({});
    const [marker, setMarker] = useState<IMarker>();
    const { state: markers, dispatch } = useContext(MarkerContext);
    const [lastAddedCouple, setLastAddedCouple] = useState<ICouple>();
    const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);

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
        google.maps.event.addListener(map!, 'click', async function (e) {
            props.setGlobalLat(e.latLng.lat());
            props.setGlobalLng(e.latLng.lng());

            setMarker({
                latLng: e.latLng,
                address: "",
                name: "Placeholder nombre",
                category: "Placeholder categoría",
                description: "Placeholder descripción"
            })
        })
    };

    useEffect(() => {
        if (marker) {
            marker.name = formatName();
            marker.category = props.globalCategory;
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

    const addMarker = (iMarker: IMarker): void => {
        if (lastAddedCouple) {
            lastAddedCouple.marker.setMap(null);
        }

        setLastAddedCouple(generateMarker(iMarker, markers.length + 1));
    };

    const generateMarker = (notAddedMarker: IMarker, id: number): ICouple => {
        const marker: GoogleMarker = new google.maps.Marker({
            position: notAddedMarker.latLng,
            map: map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: generateInfoWindowContent(notAddedMarker.name, notAddedMarker.category, notAddedMarker.description, notAddedMarker.address)
        })

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        marker.addListener('rightclick', () => {
            marker.setMap(null);
            dispatch({ type: Types.DELETE_MARKER, payload: { id: id } })
        });

        marker.setIcon("blue_marker.png");

        setGoogleMarkers(googleMarkers => [...googleMarkers, marker]);

        return { marker, infoWindow };
    }

    const generateInfoWindowContent = (name: string, category: string, description: string, address: string): string => {
        let result = ""

        result += `<h1>${name} (${category})</h1>`
        result += `<h2>${address}</h2>`
        result += `<p>${description}</p>`

        return result;
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

        homeMarkerConst.setIcon("blue_marker.png");
    };

    useEffect(() => {
        let location = new google.maps.LatLng(props.globalLat, props.globalLng);
        coordinateToAddress(location).then(address => props.setGlobalAddress(address));

        if (lastAddedCouple) {
            lastAddedCouple.marker.setPosition(location);
        }
    }, [props.globalLat, props.globalLng]);

    useEffect(() => {
        if (lastAddedCouple) {
            lastAddedCouple.infoWindow.setContent(
                generateInfoWindowContent(
                    formatName(),
                    props.globalCategory,
                    formatDescription(),
                    props.globalAddress
                )
            );
        }
    }, [props.globalName, props.globalDescription, props.globalCategory, props.globalAddress]);


    useEffect(() => {
        if (lastAddedCouple && props.acceptedMarker) {
            lastAddedCouple.marker = new google.maps.Marker();
            props.setAcceptedMarker(false);
        }
    }, [props.acceptedMarker]);

    useEffect(() => {
        deleteAllMarkers();

        switch (props.seleccion) {
            case 'M':
                loadContext();
                break;
            case 'A':
                // <- Cargar marcadores
                break;
            case 'E':
                // <- Cargar marcadores
                break;
            default:
        }

    }, [props.seleccion]);

    const deleteAllMarkers = (): void => {
        googleMarkers.forEach((googleMarker) => {
            googleMarker.setMap(null)
        });

        setGoogleMarkers([]);
    }

    const loadContext = (): void => {
        markers.forEach((marker) => {
            markerHashMap.current[marker.id] = generateMarker(parseMarker(marker), marker.id);
        })
    }

    const parseMarker = (iPMarker: IPMarker): IMarker => {
        return {
            name: iPMarker.name,
            address: iPMarker.address,
            category: iPMarker.category,
            description: iPMarker.description,
            latLng: new google.maps.LatLng(iPMarker.lat, iPMarker.lng),
        };
    }

    const coordinateToAddress = (coordinate: GoogleLatLng): Promise<string> => {
        const geocoder = new google.maps.Geocoder();
        return new Promise((resolve, reject) => {
            geocoder.geocode(
                {
                    location: coordinate
                },
                (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        const formatedAddress = results[0].formatted_address;
                        resolve(formatedAddress);
                    } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                        const formatedAddress = "Sin resultados";
                        resolve(formatedAddress);
                    } else {
                        reject(new Error(status));
                    }
                }
            )
        })
    };

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