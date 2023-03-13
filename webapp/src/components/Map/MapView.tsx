import Map from './Map';
import { useState } from 'react';
import { Grid, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NewUbicationForm from './NewUbicationForm';


const MapView = () => {
    const [globalLat, setGlobalLat] = useState<number>(0);
    const [globalLng, setGlobalLng] = useState<number>(0);
    const [globalName, setGlobalName] = useState<string>("");
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
                    formOpened={formOpened}
                    setFormOpened={setFormOpened}
                />
            </Grid>
        </Grid>
    );
}

export default MapView;
