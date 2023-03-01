import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import LoginForm from './components/LoginForm';
import Map from './components/Map/Map';
import { loadMapApi } from "./utils/GoogleMapsUtils";
import './App.css';

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
      <Container maxWidth="sm">
        <LoginForm OnUserIsLoggedChange={refreshUserName} />
        {scriptLoaded && (
          <Map
            mapType={google.maps.MapTypeId.ROADMAP}
            mapTypeControl={true}
          />
        )}
      </Container>
    </>
  );
}

export default App;
