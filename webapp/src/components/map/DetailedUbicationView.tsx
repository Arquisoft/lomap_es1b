import React, { useContext, useState } from 'react';
import { IPMarker } from "../../shared/SharedTypes";
import { MarkerContext, Types } from '../../context/MarkerContextProvider';
import { Slide, Stack, TextField, Dialog, Rating, Button } from '@mui/material';

interface DetailedUbicationViewProps {
  detailedMarker: IPMarker;
  detailedMarkerOpened: boolean;
  setDetailedMarker: (detailedMarker: IPMarker) => void;
  setDetailedMarkerOpened: (detailedMarkerOpened: boolean) => void;
}

const DetailedUbicationView: React.FC<DetailedUbicationViewProps> = (props) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { state: markers, dispatch } = useContext(MarkerContext);
  const [openValoracion, setOpenValoracion] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let marker = markers.filter(marker => marker.id === props.detailedMarker.id).at(0)!
    marker.ratings.push(rating);
    marker.comments.push(comment);

    dispatch({ type: Types.DELETE_MARKER, payload: { id: marker.id } });
    dispatch({ type: Types.ADD_MARKER, payload: { marker: marker } });
  }

  const getRatingMean = () => {
    let sum = props.detailedMarker.ratings.map(n => parseInt(n.toString())).reduce((previous, current) => current += previous, 0);
    let total = props.detailedMarker.ratings.length;
    let result = sum / total;

    return result;
  }

  return (
    <>
      <Slide style={{ color: 'white' }} direction="right" in={props.detailedMarkerOpened} mountOnEnter unmountOnExit>
        <Stack alignItems="right" sx={{
          margin: 2,
          display: props.detailedMarkerOpened ? '' : 'none'
        }}>
          <h1>{props.detailedMarker.name}</h1>
          <p style={{ marginTop: '0em' }}>Dirección: {props.detailedMarker.address}</p>
          <p>Categoría: {props.detailedMarker.category}</p>
          <p>Descripción: {props.detailedMarker.description}</p>
          <h2>Resumen de reseñas</h2>
          <Rating value={getRatingMean()} readOnly />
          <ul>
            {props.detailedMarker.comments.map(comment =>
              <li key={comment}>{comment}</li>
            )}
          </ul>
          <Button variant="contained" type="submit" sx={{ my: 2 }} onClick={() => setOpenValoracion(true)}>Dejar valoración</Button>
          <Dialog onClose={() => setOpenValoracion(false)} open={openValoracion}>
            <form name="newValoracion" onSubmit={handleSubmit}>
              <Stack direction='column' padding={'2em'}>
                <h1>Valora esta ubicación</h1>
                <TextField
                  required
                  type='number'
                  InputProps={{
                    inputProps: {
                      max: 5, min: 0
                    }
                  }}
                  value={rating}
                  name="puntuacion"
                  label="Puntuación"
                  sx={{ marginTop: 6, marginBottom: 2, bgcolor: 'white' }}
                  onChange={(e) => setRating(e.target.value as unknown as number)}
                />
                <TextField
                  rows={4}
                  required
                  multiline
                  value={comment}
                  name="comentario"
                  label="Comentario"
                  onChange={(e) => setComment(e.target.value as string)}
                  sx={{ marginTop: 6, marginBottom: 2, bgcolor: 'white', width: '30em' }}
                />
                <Button variant="contained" type="submit" sx={{ my: 2, alignSelf: 'flex-start' }}>Enviar</Button>
              </Stack>
            </form>
          </Dialog>
        </Stack>
      </Slide>
    </>
  );
}

export default DetailedUbicationView;
