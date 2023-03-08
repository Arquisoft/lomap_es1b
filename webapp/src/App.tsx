import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Container from '@mui/material/Container';
import LoginForm from './components/LoginForm';
import Map from './components/Map/Map';
import { loadMapApi } from "./utils/GoogleMapsUtils";
import './App.css';
import Welcome from './components/Welcome';

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
        <Container maxWidth="sm">
          <Welcome message={user} />
          <nav>
            <Link to="/">Mapa</Link>
            <Link to="/ubications">Tus ubicaciones</Link>
            <Link to="/friends">Tus amigos</Link>
            <Link to="/login">Login</Link>
          </nav>
          <Routes>

            <Route path="/" element={
              scriptLoaded && (
                <Map
                  mapType={google.maps.MapTypeId.ROADMAP}
                  mapTypeControl={true}
                />
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
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
