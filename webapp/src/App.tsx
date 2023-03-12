import './App.css';
import { useEffect, useState, useContext } from 'react';
import LoginForm from './components/LoginForm';
import MapView from './components/Map/MapView';
import { Stack, Container } from '@mui/material';
import { loadMapApi } from './utils/GoogleMapsUtils';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MarkerContext, MarkerContextProvider, Types } from './context/MarkerContextProvider';

import FriendsList from './components/Friends/Friends';

import FriendForm from './components/FriendForm';
import { readMarkers } from './helpers/SolidHelper';

function App(): JSX.Element {
  const [user, setUser] = useState<string>("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { session } = useSession();

  const { dispatch } = useContext(MarkerContext)

  session.onLogin(async () => {
    setIsLoggedIn(true)
    const read = readMarkers(session.info.webId!)
    dispatch({ type: Types.SET_MARKER, payload: { marker: await read}});
  })

  const refreshUserName = async (name: string) => {
    setUser(name)
  }

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);


  session.onLogout(()=>{
    setIsLoggedIn(false)
    // Al cerrar sesion elimina los marcadores del usuario de la memoria
    dispatch({ type: Types.SET_MARKER, payload: { marker: [] } })
  })


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
            <LoginForm OnUserIsLoggedChange={refreshUserName}/>
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
            scriptLoaded && (<FriendsList/>)
            // <Container>Componente de tus amigos</Container>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
