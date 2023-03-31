import Map from './Map';
import NewUbicationForm from './NewUbicationForm';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../shared/SharedTypes";
import { useState, useEffect, useContext } from 'react';
import { readMarkers, saveMarkers } from '../../helpers/SolidHelper';
import { Grid, Button, Select, MenuItem } from '@mui/material';
import { MarkerContext, Types } from '../../context/MarkerContextProvider';

const MapView = () => {
    const { session } = useSession();
    const [globalLat, setGlobalLat] = useState<number>(0);
    const [globalLng, setGlobalLng] = useState<number>(0);
    const [seleccion, setSeleccion] = useState<string>("");
    const [globalName, setGlobalName] = useState<string>("");
    const [formOpened, setFormOpened] = useState<boolean>(false);
    const { state: markers, dispatch } = useContext(MarkerContext);
    const [acceptedMarker, setAcceptedMarker] = useState<boolean>(false);
    const [globalDescription, setGlobalDescription] = useState<string>("");
    const [globalCategory, setGlobalCategory] = useState<string>("");

    const addMarker = (marker: IPMarker): void => {
        dispatch({ type: Types.ADD_MARKER, payload: { marker: marker } })
    };

    useEffect(() => {
        saveMarkers(markers, session.info.webId!);
    }, [markers]);

    return (
        <Grid container>
            <Grid item xs={formOpened ? 9 : 12}>
                <Select
                    value={session.info.isLoggedIn ? seleccion : 'E'}
                    onChange={session.info.isLoggedIn ? (e) => setSeleccion(e.target.value) :  (e) => setSeleccion('E')}
                    sx={{ width: '15em', height: '3em', verticalAlign: 'middle', bgcolor: 'white' }}
                >
                    <MenuItem value={'M'}>Mis ubicaciones</MenuItem>
                    <MenuItem value={'A'}>Ubicaciones de amigo</MenuItem>
                    <MenuItem value={'E'}>Explorar</MenuItem>
                </Select>
                <Button
                    sx={{
                        width: '15em',
                        color: 'white',
                        fontSize: 'large',
                        //display: formOpened ? 'none' : '',
                        display: (session.info.isLoggedIn || formOpened) ? '' : 'none'
                    }}
                    variant="contained"
                    onClick={async () => setFormOpened(!formOpened)}
                >Nueva ubicación</Button>

                <Map
                    mapTypeControl={true}
                    globalLat={globalLat}
                    globalLng={globalLng}
                    seleccion={seleccion}
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
                    globalCategory={globalCategory}
                    setAcceptedMarker={setAcceptedMarker}
                    formOpened={formOpened}
                    setFormOpened={setFormOpened}
                    setGlobalDescription={setGlobalDescription}
                    setGlobalCategory={setGlobalCategory}
                />
            </Grid>
        </Grid>
    );
}

export default MapView;
