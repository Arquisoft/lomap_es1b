import { Button, Grid, Box } from '@mui/material';
import { IPMarker } from "../../shared/shareddtypes";
import { MarkerContext } from '../../context/MarkerContextProvider';
import { useState, useEffect, useContext } from 'react';

const UbicationsView = () => {

    const { state: markers, dispatch } = useContext(MarkerContext);

    return (
        <>
            {
                markers.length > 0
                    ? (
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '2em' }}>
                            {
                                markers.map((ubication: IPMarker) => 
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                                            <h1>{ubication.name}</h1>
                                            <p>{ubication.description}</p>
                                            <p>{ubication.lat}</p>
                                            <p>{ubication.lng}</p>
                                            <Button>Borrar</Button>
                                        </Box>
                                    </Grid>
                                )
                            }
                        </Grid>
                    ) : (
                        <p>Aún no has creado ninguna ubicación</p>
                    )
            }
        </>
    ); 
}

export default UbicationsView;
