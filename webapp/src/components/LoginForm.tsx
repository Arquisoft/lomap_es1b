import React, { useState, useContext } from 'react';
import { useSession } from '@inrupt/solid-ui-react';
import { readMarkers } from '../helpers/SolidHelper';
import { MarkerContext, Types } from '../context/MarkerContextProvider';
import { Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { login, handleIncomingRedirect, getDefaultSession } from "@inrupt/solid-client-authn-browser";

type LoginFormProps = {
  OnUserIsLoggedChange: (proveedor: string) => void;
}

function LoginForm(props: LoginFormProps): JSX.Element {
  const { session } = useSession();
  const [proveedor, setProveedor] = useState("");
  const { dispatch } = useContext(MarkerContext);

  const seleccionarProveedor = (e: SelectChangeEvent) => {
    setProveedor(e.target.value as string);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleIncomingRedirect();
    if (!getDefaultSession().info.isLoggedIn) {
      await login({
        oidcIssuer: proveedor,
        redirectUrl: window.location.href,
        clientName: "LoMap"
      });
    }

    props.OnUserIsLoggedChange(getDefaultSession().info.webId!.substring(8).split('.')[0]);
  }

  session.onLogin(async () => {
    dispatch({ type: Types.SET_MARKER, payload: { markers: await readMarkers(session.info.webId!) } });
  })

  return (
    <>
      <form name="register" onSubmit={handleSubmit} className="loginForm">
        <Select
          value={proveedor}
          onChange={seleccionarProveedor}
          sx={{ width: '12em', height: '3em', verticalAlign: 'middle' }}
        >
          <MenuItem value={"https://solidcommunity.net/"}>
            SOLID community
          </MenuItem>
          <MenuItem value={"https://inrupt.net/"}>Inrupt</MenuItem>
        </Select>
        <Button
          disabled={proveedor === "" || getDefaultSession().info.isLoggedIn}
          variant="contained"
          type="submit"
          sx={{ width: '12em', height: '3em' }}>Iniciar sesión</Button>
      </form>
    </>
  );
}

export default LoginForm;
