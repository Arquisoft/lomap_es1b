import Map from './Map';
import { useState } from 'react';
import { Grid } from '@mui/material';
import NewUbicationForm from './NewUbicationForm';


const MapView = () => {
    const [globalLat, setGlobalLat] = useState<number>(0);
    const [globalLng, setGlobalLng] = useState<number>(0);
    const [globalName, setGlobalName] = useState<string>("");
    const [acceptedMarker, setAcceptedMarker] = useState<boolean>(false);
    const [globalDescription, setGlobalDescription] = useState<string>("");

    return (
        <Grid container>
            <Grid item xs={9}>
                <Map
                    mapType={google.maps.MapTypeId.ROADMAP}
                    mapTypeControl={true}
                    globalLat={globalLat}
                    setGlobalLat={setGlobalLat}
                    globalLng={globalLng}
                    setGlobalLng={setGlobalLng}
                    globalName={globalName}
                    globalDescription={globalDescription}
                    acceptedMarker={acceptedMarker}
                    setAcceptedMarker={setAcceptedMarker}
                />
            </Grid>
            <Grid item xs={3}>
                <NewUbicationForm
                    globalLat={globalLat}
                    setGlobalLat={setGlobalLat}
                    globalLng={globalLng}
                    setGlobalLng={setGlobalLng}
                    globalName={globalName}
                    setGlobalName={setGlobalName}
                    globalDescription={globalDescription}
                    setGlobalDescription={setGlobalDescription}
                    setAcceptedMarker={setAcceptedMarker}
                />
            </Grid>
        </Grid>
    );
}

export default MapView;
