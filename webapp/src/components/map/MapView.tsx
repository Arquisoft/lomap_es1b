import Map from './Map';
import NewUbicationForm from './NewUbicationForm';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../shared/SharedTypes";
import { useState, useEffect, useContext } from 'react';
import { saveMarkers } from '../../helpers/SolidHelper';
import { Grid, Button, Select, MenuItem, Stack, Box, FormGroup, Container, Dialog, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MarkerContext, Types } from '../../context/MarkerContextProvider';
import DetailedUbicationView from './DetailedUbicationView';
import { position } from 'rdf-namespaces/dist/schema';
import { last } from 'lodash';

const MapView = () => {
    const { session } = useSession();
    const [globalLat, setGlobalLat] = useState<number>(0);
    const [globalLng, setGlobalLng] = useState<number>(0);
    const [seleccion, setSeleccion] = useState<string>("E");
    const [globalName, setGlobalName] = useState<string>("");
    const [formOpened, setFormOpened] = useState<boolean>(false);
    const { state: markers, dispatch } = useContext(MarkerContext);
    const [globalAddress, setGlobalAddress] = useState<string>("");
    const [globalCategory, setGlobalCategory] = useState<string>("Museos");
    const [acceptedMarker, setAcceptedMarker] = useState<boolean>(false);
    const [globalDescription, setGlobalDescription] = useState<string>("");
    const [detailedMarker, setDetailedMarker] = useState<IPMarker>({ id: -1, date: new Date(), lat: 0, lng: 0, name: "sin nombre", address: "sin direccion", category: "sin categoría", isPublic: false, description: "sin descripcion" });
    const [detailedMarkerOpened, setDetailedMarkerOpened] = useState<boolean>(false);
    const [openFiltros, setOpenFiltros] = useState<boolean>(false);
    const [formats, setFormats] = useState(() => ['museos', 'parques', 'tiendas', 'edificios', 'farmacias', 'transporte', 'restaurantes', 'entretenimiento']);

    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
    ) => {
        setFormats(newFormats);
    };

    const addMarker = (marker: IPMarker): void => {
        dispatch({ type: Types.ADD_MARKER, payload: { marker: marker } })
    };

    useEffect(() => {
        if (session.info.isLoggedIn) {
            saveMarkers(markers, session.info.webId!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markers]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Stack direction={'row'} alignItems={'center'} sx={{ color: 'white', bgcolor: 'rgba(0,0,0,0.3)' }}>
                    <Select
                        value={seleccion}
                        onChange={(e) => setSeleccion(e.target.value)}
                        sx={{ width: '15em', height: '3em', verticalAlign: 'middle', bgcolor: 'white', margin: '1em', opacity: '1' }}
                    >
                        <MenuItem value={'M'}>Mis ubicaciones</MenuItem>
                        <MenuItem value={'A'}>Ubicaciones de amigo</MenuItem>
                        <MenuItem value={'E'}>Explorar</MenuItem>
                    </Select>
                    <Button
                        sx={{
                            bgcolor: 'white',
                            color: 'black',
                            fontSize: 'large',
                        }}
                        variant="contained"
                        onClick={() => setOpenFiltros(true)}
                    >Filtros</Button>
                    <Dialog onClose={() => setOpenFiltros(false)} open={openFiltros}>
                        <Stack direction='column' padding={'2em'}>
                            <h1>Filtros</h1>
                            <h2>Nombre</h2>
                            <TextField></TextField>
                            <h2>Categorías</h2>
                            <ToggleButtonGroup
                                sx={{ display: 'flex', flexWrap: 'wrap' }}
                                value={formats}
                                onChange={handleFormat}
                                aria-label="categorias seleccionadas">
                                <ToggleButton value="museos" aria-label="museos">Museos</ToggleButton>
                                <ToggleButton value="parques" aria-label="parques">Parques</ToggleButton>
                                <ToggleButton value="tiendas" aria-label="tiendas">Tiendas</ToggleButton>
                                <ToggleButton value="edificios" aria-label="edificios">Edificios</ToggleButton>
                                <ToggleButton value="farmacias" aria-label="farmacias">Farmacias</ToggleButton>
                                <ToggleButton value="transporte" aria-label="transporte">Transporte</ToggleButton>
                                <ToggleButton value="restaurantes" aria-label="restaurantes">Restaurantes</ToggleButton>
                                <ToggleButton value="entretenimiento" aria-label="entretenimiento">Entretenimiento</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    </Dialog>
                    <Box sx={{ flexGrow: 2 }}></Box>
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
                </Stack>
            </Grid>
            <Grid item xs={detailedMarkerOpened ? 3 : 0}>
                <DetailedUbicationView
                    detailedMarkerOpened={detailedMarkerOpened}
                    setDetailedMarkerOpened={setDetailedMarkerOpened}
                    detailedMarker={detailedMarker}
                    setDetailedMarker={setDetailedMarker}
                />
            </Grid>
            <Grid item xs={12 - (formOpened ? 3 : 0) - (detailedMarkerOpened ? 3 : 0)}>
                <Map
                    mapTypeControl={true}
                    globalLat={globalLat}
                    globalLng={globalLng}
                    seleccion={seleccion}
                    globalName={globalName}
                    setGlobalLat={setGlobalLat}
                    setGlobalLng={setGlobalLng}
                    globalAddress={globalAddress}
                    acceptedMarker={acceptedMarker}
                    globalCategory={globalCategory}
                    setGlobalAddress={setGlobalAddress}
                    globalDescription={globalDescription}
                    setAcceptedMarker={setAcceptedMarker}
                    mapType={google.maps.MapTypeId.ROADMAP}
                    setDetailedMarker={setDetailedMarker}
                    setDetailedMarkerOpened={setDetailedMarkerOpened}
                />
            </Grid>
            <Grid item xs={3}>
                <NewUbicationForm
                    globalLat={globalLat}
                    globalLng={globalLng}
                    addMarker={addMarker}
                    globalName={globalName}
                    formOpened={formOpened}
                    setGlobalLat={setGlobalLat}
                    setGlobalLng={setGlobalLng}
                    setGlobalName={setGlobalName}
                    setFormOpened={setFormOpened}
                    globalAddress={globalAddress}
                    globalCategory={globalCategory}
                    globalDescription={globalDescription}
                    setGlobalCategory={setGlobalCategory}
                    setAcceptedMarker={setAcceptedMarker}
                    setGlobalDescription={setGlobalDescription}

                />
            </Grid>
        </Grid>
    );
}

export default MapView;
