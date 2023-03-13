import { Button, Grid, Box } from '@mui/material';
import { IPMarker } from "../../shared/shareddtypes";

const UbicationsView = () => {

    var ubications:IPMarker[] = [{ id: 1, date: new Date(), name: "Ubicacion1", description: "Ubicacion1 Desc", lat: 43, lng: -3 }, { id: 2, date: new Date(), name: "Ubicacion2", description: "Ubicacion2 Desc", lat: 44, lng: -3 },
    { id: 3, date: new Date(), name: "Ubicacion3", description: "Ubicacion3 Desc", lat: 42, lng: -3 }, { id: 4, date: new Date(), name: "Ubicacion4", description: "Ubicacion4 Desc", lat: 43, lng: -2 },
    { id: 5, date: new Date(), name: "Ubicacion5", description: "Ubicacion5 Desc", lat: 44, lng: -2 }, { id: 6, date: new Date(), name: "Ubicacion6", description: "Ubicacion6 Desc", lat: 42, lng: -2 }];

    return (
        <>
            {
                ubications.length > 0
                    ? (
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '2em' }}>
                            {
                                ubications.map((ubication: IPMarker) => {
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                                            <h1>{ubication.name}</h1>
                                            <p>{ubication.description}</p>
                                            <p>{ubication.lat}</p>
                                            <p>{ubication.lng}</p>
                                            <Button>Borrar</Button>
                                        </Box>
                                    </Grid>
                                })
                            }
                        </Grid>
                    ) : (
                        <p>Aún no has creado ninguna ubicación</p>
                    )
            }
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '2em' }}>
                <Grid item xs={6} sm={4} md={3}>
                    <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                        <h1>Ubicación 1</h1>
                        <p>Ubicación 1</p>
                        <p>43,93206919289874</p>
                        <p>-7,657041674999993</p>
                        <Button>Borrar</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                        <h1>Ubicación 2</h1>
                        <p>Ubicación 2</p>
                        <p>43,93206919289874</p>
                        <p>-7,657041674999993</p>
                        <Button>Borrar</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                        <h1>Ubicación 3</h1>
                        <p>Ubicación 3</p>
                        <p>43,93206919289874</p>
                        <p>-7,657041674999993</p>
                        <Button>Borrar</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                        <h1>Ubicación 4</h1>
                        <p>Ubicación 4</p>
                        <p>43,93206919289874</p>
                        <p>-7,657041674999993</p>
                        <Button>Borrar</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                        <h1>Ubicación 5</h1>
                        <p>Ubicación 5</p>
                        <p>43,93206919289874</p>
                        <p>-7,657041674999993</p>
                        <Button>Borrar</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                        <h1>Ubicación 6</h1>
                        <p>Ubicación 6</p>
                        <p>43,93206919289874</p>
                        <p>-7,657041674999993</p>
                        <Button>Borrar</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default UbicationsView;
