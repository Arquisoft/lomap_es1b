import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Stack, Container, Grid } from '@mui/material';
import LoginForm from './components/LoginForm';
import Map from './components/Map/Map';
import { loadMapApi } from "./utils/GoogleMapsUtils";
import './App.css';
import Welcome from './components/Welcome';
import NewUbicationForm from './components/NewUbicationForm';

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
              <Grid container>
                <Grid item xs={9}>
                  <Map
                    mapType={google.maps.MapTypeId.ROADMAP}
                    mapTypeControl={true}
                  />
                </Grid>
                <Grid item xs={3}>
                  <NewUbicationForm />
                </Grid>
              </Grid>

            )
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
