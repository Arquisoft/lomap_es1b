import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Slide, Box, Stack, TextField, Switch, FormGroup, FormControlLabel } from '@mui/material';
import type { AlertColor } from '@mui/material/Alert';

type EmailFormProps = {
  OnUserListChange: () => void;
}

type NotificationType = {
  severity: AlertColor,
  message: string;
}

function NewUbicationForm(): JSX.Element {
  const [formOpened, setFormOpened] = useState(false)

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //AddUbication()
  }

  return (
    <>
      <Button
        sx={{
          bgcolor: '#ffffff',
          color: '#00000',
          marginTop: '2em',
          fontSize: 'large',
          display: formOpened? 'none' : 'inline'
        }}
        onClick={async () => setFormOpened(!formOpened)}
      >Nueva ubicación</Button>

      <Slide direction="left" in={formOpened} mountOnEnter unmountOnExit >
          <form name="newUbication" onSubmit={handleSubmit}>
            <Stack alignItems="right" sx={{margin: 2}}>
              <TextField
                required
                type='number'
                name="latitude"
                label="Latitud"
                variant="outlined"
                value={latitude}
                onChange={e => setLatitude(e.target.value as unknown as number)}
                sx={{ marginTop: 6, marginBottom:2 }}
              />
              <TextField
                required
                type='number'
                name="longitude"
                label="Longitud"
                variant="outlined"
                value={longitude}
                onChange={e => setLongitude(e.target.value as unknown as number)}
                sx={{ my: 2 }}
              />
              <TextField
                required
                name="name"
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                required
                name="description"
                label="Descripción"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
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
