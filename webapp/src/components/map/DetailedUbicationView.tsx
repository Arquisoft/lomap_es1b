import Button from '@mui/material/Button';
import React, { useState, useContext } from 'react';
import { IPMarker } from "../../shared/SharedTypes";
import { MarkerContext } from '../../context/MarkerContextProvider'
import { Slide, Stack, TextField, Switch, FormGroup, FormControlLabel, Select, MenuItem, Dialog } from '@mui/material';

interface DetailedUbicationViewProps {
  detailedMarkerOpened: boolean;
  setDetailedMarkerOpened: (detailedMarkerOpened: boolean) => void;
  detailedMarker: IPMarker;
  setDetailedMarker: (detailedMarker: IPMarker) => void;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

}

const DetailedUbicationView: React.FC<DetailedUbicationViewProps> = (props) => {
  const [openValoracion, setOpenValoracion] = useState<boolean>(false);

  return (
    <>
      <Slide direction="right" in={props.detailedMarkerOpened} mountOnEnter unmountOnExit >
        <Stack alignItems="right" sx={{
          margin: 2,
          display: props.detailedMarkerOpened ? '' : 'none'
        }}>
          <Button variant="contained" onClick={async () => props.setDetailedMarkerOpened(!props.detailedMarkerOpened)} sx={{ my: 2, alignSelf: 'flex-end', bgcolor: 'white', color: 'black' }} >X</Button>

          <h1>{props.detailedMarker.name}</h1>
          <h2>{props.detailedMarker.lat.toFixed(5)}, {props.detailedMarker.lng.toFixed(5)}</h2>
          <img src='favicon.png' width='100%' />
          <p>{props.detailedMarker.address}</p>
          <p>{props.detailedMarker.category}</p>
          <p>{props.detailedMarker.description}</p>
          <Button variant="contained" type="submit" sx={{ my: 2 }} onClick={() => setOpenValoracion(true)}>Dejar valoración</Button>
          <Dialog onClose={() => setOpenValoracion(false)} open={openValoracion}>
            <form name="newValoracion" onSubmit={handleSubmit}>
              <Stack direction='column' padding={'2em'}>
                <h1>Deja tu valoración</h1>
                <h2>{props.detailedMarker.name}</h2>
                <TextField
                  required
                  type='number'
                  name="puntuacion"
                  label="Puntuación"
                  sx={{ marginTop: 6, marginBottom: 2, bgcolor: 'white' }}
                />
                <TextField
                  required
                  name="comentario"
                  label="Comentario"
                  multiline
                  rows={4}
                  sx={{ marginTop: 6, marginBottom: 2, bgcolor: 'white', width: '30em' }}
                />
                <Button variant="contained" type="submit" sx={{ my: 2, alignSelf: 'flex-start' }} >Enviar</Button>

              </Stack>
            </form>
          </Dialog>
        </Stack>
      </Slide>
    </>
  );
}

export default DetailedUbicationView;
