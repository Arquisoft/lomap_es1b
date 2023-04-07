import { useContext } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { IPMarker } from "../../../shared/SharedTypes";
import { MarkerContext, Types } from '../../../context/MarkerContextProvider';

const UbicationsView = () => {
    const { state: markers, dispatch } = useContext(MarkerContext);
    const deleteUbication = (id: string) => {
        dispatch({ type: Types.DELETE_MARKER, payload: { id: id } });
    }

    return (
        <>
            {
                markers.length > 0 ?
                    (
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '2em' }}>
                            {
                                markers.map((ubication: IPMarker) =>
                                    <Grid item xs={6} sm={4} md={3} key={ubication.id}>
                                        <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                                            <h1>{ubication.name}, ({ubication.category})</h1>
                                            <h2>{ubication.address}</h2>
                                            <p>{ubication.description}</p>
                                            <Button onClick={() => deleteUbication(ubication.id)}>
                                                Borrar
                                            </Button>
                                        </Box>
                                    </Grid>
                                )
                            }
                        </Grid>
                    )
                    :
                    (
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Aún no has creado ninguna ubicación</h1>
                    )
            }
        </>
    );
}

export default UbicationsView;

