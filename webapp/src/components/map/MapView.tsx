import Map from './Map';
import { Close } from '@mui/icons-material';
import NewUbicationForm from './NewUbicationForm';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../shared/SharedTypes";
import { useState, useEffect, useContext } from 'react';
import { saveMarkers } from '../../helpers/SolidHelper';
import DetailedUbicationView from './DetailedUbicationView';
import { MarkerContext, Types } from '../../context/MarkerContextProvider';
import { Grid, Button, Select, MenuItem, Stack, Box, Dialog, TextField, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';

const MapView = () => {
    const { session } = useSession();

    const [globalLat, setGlobalLat] = useState<number>(0);
    const [globalLng, setGlobalLng] = useState<number>(0);
    const [seleccion, setSeleccion] = useState<string>("E");
    const [globalName, setGlobalName] = useState<string>("");
    const [selectedName, setSelectedName] = useState<string>("");
    const [formOpened, setFormOpened] = useState<boolean>(false);
    const { state: markers, dispatch } = useContext(MarkerContext);
    const [globalAddress, setGlobalAddress] = useState<string>("");
    const [openFiltros, setOpenFiltros] = useState<boolean>(false);
    const [globalCategory, setGlobalCategory] = useState<string>("Museos");
    const [acceptedMarker, setAcceptedMarker] = useState<boolean>(false);
    const [globalDescription, setGlobalDescription] = useState<string>("");
    const [detailedMarkerOpened, setDetailedMarkerOpened] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState(['Museos', 'Parques', 'Tiendas',
        'Edificios', 'Farmacias', 'Transporte',
        'Restaurantes', 'Entretenimiento']);
    const [detailedMarker, setDetailedMarker] = useState<IPMarker>({
        id: -1, date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
        category: "Sin categoría", isPublic: false, description: "Sin descripción",
        ratings: [], comments: []
    });

    const handleCategory = (
        event: React.MouseEvent<HTMLElement>,
        newCategories: string[]

    ) => {
        setSelectedCategories(newCategories);
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
        <Grid container sx={{ width: '100%', height: '100%' }}>
            <Grid item xs={12}>
                <Stack direction={'row'} alignItems={'center'} sx={{ color: 'white' }}>
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
                            fontSize: 'large'
                        }}
                        variant="contained"
                        onClick={() => setOpenFiltros(true)}
                    >Filtros</Button>
                    <Dialog onClose={() => setOpenFiltros(false)} open={openFiltros}>
                        <Stack direction='column' padding={'2em'}>
                            <IconButton onClick={async () => setOpenFiltros(false)} sx={{ alignSelf: 'flex-end' }}><Close /></IconButton>
                            <h1>Filtros</h1>
                            <h2>Nombre</h2>
                            <TextField value={selectedName} onChange={(e) => setSelectedName(e.target.value as string)}></TextField>
                            <h2>Categorías</h2>
                            <ToggleButtonGroup
                                sx={{ display: 'flex', flexWrap: 'wrap' }}
                                value={selectedCategories}
                                onChange={handleCategory}
                                aria-label="categorias seleccionadas">
                                <ToggleButton sx={{ flex: '1' }} value="Museos" aria-label="museos">Museos</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Parques" aria-label="parques">Parques</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Tiendas" aria-label="tiendas">Tiendas</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Edificios" aria-label="edificios">Edificios</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Farmacias" aria-label="farmacias">Farmacias</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Transporte" aria-label="transporte">Transporte</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Restaurantes" aria-label="restaurantes">Restaurantes</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Entretenimiento" aria-label="entretenimiento">Entretenimiento</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    </Dialog>
                    <Box sx={{ flexGrow: 2 }}></Box>
                    <Button
                        sx={{
                            width: '15em',
                            margin: '1em',
                            fontSize: 'large',
                            display: formOpened ? 'none' : '',
                        }}
                        variant="contained"
                        onClick={async () => setFormOpened(!formOpened)}
                    >Nueva ubicación</Button>
                </Stack>
            </Grid>
            <Grid item xs={detailedMarkerOpened ? 3 : 0}>
                <DetailedUbicationView
                    detailedMarker={detailedMarker}
                    setDetailedMarker={setDetailedMarker}
                    detailedMarkerOpened={detailedMarkerOpened}
                    setDetailedMarkerOpened={setDetailedMarkerOpened}
                />
            </Grid>
            <Grid item xs={12 - (formOpened ? 3 : 0) - (detailedMarkerOpened ? 3 : 0)} sx={{ width: '100%', height: '100%' }}>
                <Map
                    mapTypeControl={true}
                    globalLat={globalLat}
                    globalLng={globalLng}
                    seleccion={seleccion}
                    globalName={globalName}
                    setGlobalLat={setGlobalLat}
                    setGlobalLng={setGlobalLng}
                    selectedName={selectedName}
                    globalAddress={globalAddress}
                    acceptedMarker={acceptedMarker}
                    globalCategory={globalCategory}
                    setGlobalAddress={setGlobalAddress}
                    setAcceptedMarker={setAcceptedMarker}
                    setDetailedMarker={setDetailedMarker}
                    globalDescription={globalDescription}
                    mapType={google.maps.MapTypeId.ROADMAP}
                    selectedCategories={selectedCategories}
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
