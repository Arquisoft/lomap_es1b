import './App.css';
import { useEffect, useState } from 'react';
import MapView from './components/map/MapView';
import HomeView from './components/HomeView';
import { loadMapApi } from './utils/GoogleMapsUtils';
import FriendsList from './components/friends/Friends';
import UbicationsView from './components/map/UbicationsView';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { useSession } from '@inrupt/solid-ui-react';
import { handleIncomingRedirect,  onSessionRestore } from "@inrupt/solid-client-authn-browser";

function App(): JSX.Element {
  const [scriptLoaded, setScriptLoaded] = useState(false);

 // const { session } = useSession();
  //const navigate = useNavigate();

  // onSessionRestore((url) => {
  //   if (session.info.isLoggedIn)
  //     navigate(url);
  // });

  // useEffect(() => {
  //   handleIncomingRedirect({
  //     restorePreviousSession: true
  //   }).then(() => {
  //     if (session.info.isLoggedIn) {
  //       localStorage.setItem("webID", session.info.webId+"");
  //       localStorage.setItem("sessionID", session.info.sessionId);
  //       navigate("/");
  //     }
  //   })
  // });

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>

          <Route path="/" element={
            scriptLoaded && (
              <HomeView />)
          } />

          <Route path="/map" element={
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
