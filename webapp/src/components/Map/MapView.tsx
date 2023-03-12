import Map from './Map';
import { Grid } from '@mui/material';
import NewUbicationForm from './NewUbicationForm';
import { IPMarker } from "../../shared/shareddtypes";
import { useState, useEffect, useContext } from 'react';
import { readMarkers, saveMarkers } from '../../helpers/SolidHelper';
import { MarkerContext, Types } from '../../context/MarkerContextProvider';
import { useSession } from '@inrupt/solid-ui-react';

const MapView = () => {
    const [globalLat, setGlobalLat] = useState<number>(0);
    const [globalLng, setGlobalLng] = useState<number>(0);
    const [globalName, setGlobalName] = useState<string>("");
    const { state: markers, dispatch } = useContext(MarkerContext);
    const [acceptedMarker, setAcceptedMarker] = useState<boolean>(false);
    const [globalDescription, setGlobalDescription] = useState<string>("");
    const { session } = useSession();

    const addMarker = (marker: IPMarker): void => {
        console.log(session.info.webId!)
        dispatch({ type: Types.ADD_MARKER, payload: { marker: marker } })
    };

    useEffect(() => {
        saveMarkers(markers, session.info.webId!); // usar ID proporcionada por la sesión
    }, [markers]);

    return (
        <Grid container>
            <Grid item xs={9}>
                <Map
                    mapTypeControl={true}
                    globalLat={globalLat}
                    globalLng={globalLng}
                    globalName={globalName}
                    setGlobalLat={setGlobalLat}
                    setGlobalLng={setGlobalLng}
                    acceptedMarker={acceptedMarker}
                    globalDescription={globalDescription}
                    setAcceptedMarker={setAcceptedMarker}
                    mapType={google.maps.MapTypeId.ROADMAP}
                />
            </Grid>
            <Grid item xs={3}>
                <NewUbicationForm
                    globalLat={globalLat}
                    globalLng={globalLng}
                    addMarker={addMarker}
                    globalName={globalName}
                    setGlobalLat={setGlobalLat}
                    setGlobalLng={setGlobalLng}
                    setGlobalName={setGlobalName}
                    globalDescription={globalDescription}
                    setAcceptedMarker={setAcceptedMarker}
                    setGlobalDescription={setGlobalDescription}
                />
            </Grid>
        </Grid>
    );
}

export default MapView;
