import './App.css';
import Welcome from './components/Welcome';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import MapView from './components/Map/MapView';
import { Stack, Container } from '@mui/material';
import { loadMapApi } from './utils/GoogleMapsUtils';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
        <Welcome message={user} />
        <nav>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ bgcolor: '#575757' }}
          >
            <Link to="/">Mapa</Link>
            <Link to="/ubications">Mis ubicaciones</Link>
            <Link to="/friends">Mis amigos</Link>
            <Link to="/login">Login</Link>
          </Stack>
        </nav>
        <Routes>

          <Route path="/" element={
            scriptLoaded && (
              <MapView />)
          } />

          <Route path="/ubications" element={
            <Container>Componente de tus ubicaciones</Container>
          } />

          <Route path="/friends" element={
            <Container>Componente de tus amigos</Container>
          } />

          <Route path="/login" element={
            <LoginForm OnUserIsLoggedChange={refreshUserName} />
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
