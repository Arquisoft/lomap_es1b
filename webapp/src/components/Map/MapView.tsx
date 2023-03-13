import Map from './Map';
import { Grid, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
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
    const [formOpened, setFormOpened] = useState<boolean>(false);
    const [ubicaciones, setUbicaciones] = useState<any[]>([])
    const [seleccion, setSeleccion] = useState<string>("");

    const seleccionarUbicaciones = (e: SelectChangeEvent) => {
        setSeleccion(e.target.value);
        if (e.target.value === 'Mis') {
            setUbicaciones([{ lat: 10, lon: 2 }, { lat: 10, lon: 3 }, { lat: 10, lon: 4 }]);
        }
        if (e.target.value === '1') {
            setUbicaciones([{ lat: 11, lon: 2 }, { lat: 11, lon: 3 }, { lat: 11, lon: 4 }]);
        }
        if (e.target.value === 'Explorar') {
            setUbicaciones([{ lat: 9, lon: 2 }, { lat: 9, lon: 3 }, { lat: 9, lon: 4 }]);
        }
    };
    const { session } = useSession();

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
                    value={seleccion}
                    onChange={seleccionarUbicaciones}
                    sx={{ width: '15em', height: '3em', verticalAlign: 'middle', bgcolor: 'white' }}
                >
                    <MenuItem value={'Mis'}>Mis ubicaciones</MenuItem>
                    <MenuItem value={'1'}>Ubicaciones de amigo</MenuItem>
                    <MenuItem value={'Explorar'}>Explorar</MenuItem>
                </Select>
                <Button
                    sx={{
                        width: '15em',
                        color: 'white',
                        fontSize: 'large',
                        display: formOpened ? 'none' : ''
                    }}
                    variant="contained"
                    onClick={async () => setFormOpened(!formOpened)}
                >Nueva ubicación</Button>

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
                    formOpened={formOpened}
                    setFormOpened={setFormOpened}
                    setGlobalDescription={setGlobalDescription}
                />
            </Grid>
        </Grid>
    );
}

export default MapView;
