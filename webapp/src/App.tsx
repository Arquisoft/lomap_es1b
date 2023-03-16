import './App.css';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import logo from "./logo-no-background.png";
import MapView from './components/Map/MapView';
import { loadMapApi } from './utils/GoogleMapsUtils';
import FriendsList from './components/Friends/Friends';
import { LoginView } from './components/Login/LoginView';
import UbicationsView from './components/Map/UbicationsView';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App(): JSX.Element {
  const [scriptLoaded, setScriptLoaded] = useState(false);

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
            <LoginView />
          </Stack>
        </nav>
        <Routes>

          <Route path="/" element={
            scriptLoaded && (
              <MapView />)
          } />

          <Route path="/ubications" element={
            <UbicationsView />
          } />

          <Route path="/friends" element={
            <FriendsList />
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
