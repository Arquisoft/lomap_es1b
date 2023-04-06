import './App.css';
import { useEffect, useState } from 'react';
import HomeView from './components/HomeView';
import { NavBar } from './components/NavBar';
import MapView from './components/map/mapAddons/MapView';
import { Routes, Route } from "react-router-dom";
import { loadMapApi } from './utils/GoogleMapsUtils';
import FriendsList from './components/friends/Friends';
import UbicationsView from './components/map/mapAddons/UbicationsView';

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
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={
          <HomeView />
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
    </>
  );
}

export default App;
