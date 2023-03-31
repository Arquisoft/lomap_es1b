import Button from '@mui/material/Button';
import React, { useState, useContext } from 'react';
import { IPMarker } from "../../shared/SharedTypes";
import { MarkerContext } from '../../context/MarkerContextProvider'
import { Slide, Stack, TextField, Switch, FormGroup, FormControlLabel, MenuItem, Select } from '@mui/material';

interface INewUbicationFormProps {
  globalLat: number;
  globalLng: number;
  globalName: string;
  globalDescription: string;
  globalCategory: string;
  addMarker: (marker: IPMarker) => void;
  setGlobalLat: (globalLat: number) => void;
  setGlobalLng: (globalLng: number) => void;
  setGlobalName: (globalName: string) => void;
  setGlobalDescription: (globalName: string) => void;
  setGlobalCategory: (globalName: string) => void;
  setAcceptedMarker: (acceptedMarker: boolean) => void;
  formOpened: boolean;
  setFormOpened: (formOpened: boolean) => void;
}

const NewUbicationForm: React.FC<INewUbicationFormProps> = (props) => {
  const [isPublic, setIsPublic] = useState(false);
  const { state: markers } = useContext(MarkerContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.addMarker({ id: markers.length + 1, date: new Date(), name: props.globalName, description: props.globalDescription, lat: props.globalLat, lng: props.globalLng });
    props.setAcceptedMarker(true);
  }

  return (
    <>
      <Slide direction="left" in={props.formOpened} mountOnEnter unmountOnExit >
        <form name="newUbication" onSubmit={handleSubmit}>
          <Stack alignItems="right" sx={{ margin: 2 }}>
            <TextField
              required
              type='number'
              name="latitude"
              label="Latitud"
              variant='filled'
              value={props.globalLat}
              onChange={e => props.setGlobalLat(e.target.value as unknown as number)}
              sx={{ marginTop: 6, marginBottom: 2, bgcolor:'white' }}
            />
            <TextField
              required
              type='number'
              name="longitude"
              label="Longitud"
              variant='filled'
              value={props.globalLng}
              onChange={e => props.setGlobalLng(e.target.value as unknown as number)}
              sx={{ my: 2, bgcolor:'white' }}
            />
            <TextField
              required
              name="name"
              label="Nombre"
              variant='filled'
              value={props.globalName}
              onChange={e => props.setGlobalName(e.target.value)}
              sx={{ my: 2, bgcolor:'white'}}
            />
            <TextField
              required
              name="description"
              label="Descripción"
              variant='filled'
              value={props.globalDescription}
              onChange={e => props.setGlobalDescription(e.target.value)}
              sx={{ my: 2, bgcolor:'white' }}
            />
            <Select
                required
                name="category"
                value={props.globalCategory}
                onChange={e => props.setGlobalCategory(e.target.value)}
                sx={{ my: 2, bgcolor:'white' }}
              >
              <MenuItem value={'E'}>Edificios</MenuItem>              
              <MenuItem value={'N'}>Entretenimiento</MenuItem>
              <MenuItem value={'F'}>Farmacias</MenuItem>
              <MenuItem value={'M'}>Museos</MenuItem>
              <MenuItem value={'P'}>Parques</MenuItem>
              <MenuItem value={'R'}>Restaurantes</MenuItem>
              <MenuItem value={'T'}>Tiendas</MenuItem>              
              <MenuItem value={'A'}>Transporte</MenuItem>
            </Select>

            <FormGroup>
              <FormControlLabel control={<Switch
                checked={isPublic}
                onChange={e => setIsPublic(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />} sx={{color:'white'}} label="Ubicación pública" />
            </FormGroup>

            <Button variant="contained" type="submit" sx={{ my: 2 }}>Aceptar</Button>
            <Button variant="contained" onClick={async () => props.setFormOpened(!props.formOpened)} sx={{ my: 2 }}>Cancelar</Button>
          </Stack>
        </form>
      </Slide>
    </>
  );
}

export default NewUbicationForm;
