import './App.css';
import LoginForm from './components/LoginForm';
import MapView from './components/Map/MapView';
import { Stack, Container, Button } from '@mui/material';
import { loadMapApi } from './utils/GoogleMapsUtils';
import FriendsList from './components/Friends/Friends';
import { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
          >
            <Link to="/">Mapa</Link>
            <Link to="/ubications">Mis ubicaciones</Link>
            <Link to="/friends">Mis amigos</Link>
            <LoginForm OnUserIsLoggedChange={refreshUserName} />
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
