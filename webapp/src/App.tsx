import './App.css';
import { useEffect, useState } from 'react';
import MapView from './components/map/MapView';
import HomeView from './components/HomeView';
import { loadMapApi } from './utils/GoogleMapsUtils';
import FriendsList from './components/friends/Friends';
import UbicationsView from './components/map/UbicationsView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar';

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
