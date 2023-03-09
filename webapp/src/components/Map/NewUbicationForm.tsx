import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Slide, Stack, TextField, Switch, FormGroup, FormControlLabel } from '@mui/material';

interface INewUbicationForm {
  globalLat: number;
  setGlobalLat: (globalLat: number) => void;
  globalLng: number;
  setGlobalLng: (globalLng: number) => void;
  globalName: string;
  setGlobalName: (globalName: string) => void;
  globalDescription: string;
  setGlobalDescription: (globalName: string) => void;
  setAcceptedMarker: (acceptedMarker: boolean) => void;
}

const NewUbicationForm: React.FC<INewUbicationForm> = ({ globalLat, setGlobalLat, globalLng, setGlobalLng,
  globalName, setGlobalName, globalDescription, setGlobalDescription, setAcceptedMarker }) => {
  const [formOpened, setFormOpened] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAcceptedMarker(true);
  }

  return (
    <>
      <Button
        sx={{
          bgcolor: '#ffffff',
          color: '#00000',
          marginTop: '2em',
          fontSize: 'large',
          display: formOpened ? 'none' : 'inline'
        }}
        onClick={async () => setFormOpened(!formOpened)}
      >Nueva ubicación</Button>

      <Slide direction="left" in={formOpened} mountOnEnter unmountOnExit >
        <form name="newUbication" onSubmit={handleSubmit}>
          <Stack alignItems="right" sx={{ margin: 2 }}>
            <TextField
              required
              type='number'
              name="latitude"
              label="Latitud"
              variant="outlined"
              value={globalLat}
              onChange={e => setGlobalLat(e.target.value as unknown as number)}
              sx={{ marginTop: 6, marginBottom: 2 }}
            />
            <TextField
              required
              type='number'
              name="longitude"
              label="Longitud"
              variant="outlined"
              value={globalLng}
              onChange={e => setGlobalLng(e.target.value as unknown as number)}
              sx={{ my: 2 }}
            />
            <TextField
              required
              name="name"
              label="Nombre"
              variant="outlined"
              value={globalName}
              onChange={e => setGlobalName(e.target.value)}
              sx={{ my: 2 }}
            />
            <TextField
              required
              name="description"
              label="Descripción"
              variant="outlined"
              value={globalDescription}
              onChange={e => setGlobalDescription(e.target.value)}
              sx={{ my: 2 }}
            />

            <FormGroup>
              <FormControlLabel control={<Switch
                checked={isPublic}
                onChange={e => setIsPublic(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />} label="Ubicación pública" />
            </FormGroup>

            <Button variant="contained" type="submit" sx={{ my: 2 }}>Aceptar</Button>
            <Button variant="contained" onClick={async () => setFormOpened(!formOpened)} sx={{ my: 2 }}>Cancelar</Button>
          </Stack>
        </form>
      </Slide>
    </>
  );
}

export default NewUbicationForm;
