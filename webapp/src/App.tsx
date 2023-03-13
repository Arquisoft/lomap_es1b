import './App.css';
import { Stack, Container, Box, Button } from '@mui/material';
import LoginForm from './components/LoginForm';
import MapView from './components/Map/MapView';
import { loadMapApi } from './utils/GoogleMapsUtils';
import FriendsList from './components/Friends/Friends';
import { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "./logo-no-background.png";
import UbicationsView from './components/Map/UbicationsView';

function App(): JSX.Element {
  const [user, setUser] = useState<string>("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const refreshUserName = async (name: string) => {
    setUser(name)
  }

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <nav>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            alignItems='center'
            justifyContent='left'
          >
            <img src={logo} className="App-logo" alt="logo" height="60" />
            <Link to="/">Mapa</Link>
            <Link to="/ubications">Mis ubicaciones</Link>
            <Link to="/friends">Mis amigos</Link>
            {user === '' ?
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end'>
                <LoginForm OnUserIsLoggedChange={refreshUserName} />
              </Stack>
              :
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Box component="p" color={'white'}>{user}</Box>
                <Button
                  variant="contained"
                  sx={{ width: '12em', height: '3em', ":disabled": { bgcolor: 'grey' } }}>Cerrar sesión</Button>
              </Stack>}
          </Stack>
        </nav>
        <Routes>

          <Route path="/" element={
            scriptLoaded && (
              <MapView />)
          } />

          <Route path="/ubications" element={
            <UbicationsView/>
          } />

          <Route path="/friends" element={
            scriptLoaded && (<FriendsList />)
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
