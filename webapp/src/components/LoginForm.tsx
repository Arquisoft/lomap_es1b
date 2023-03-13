import React, { useState } from 'react';
import { Button, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { login, handleIncomingRedirect, getDefaultSession } from "@inrupt/solid-client-authn-browser";

type LoginFormProps = {
  OnUserIsLoggedChange: (proveedor: string) => void;
}

function LoginForm(props: LoginFormProps): JSX.Element {

  const [proveedor, setProveedor] = useState("");

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

    props.OnUserIsLoggedChange(getDefaultSession().info.webId!.substring(8).split('.')[0])
  }

  return (
    <>
      <form name="register" onSubmit={handleSubmit} className="loginForm">
        <Select
          value={proveedor}
          onChange={seleccionarProveedor}
          sx={{ width: '12em', height: '3em', verticalAlign:'middle', bgcolor:'white'}}
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
          sx={{ width: '12em', height: '3em', ":disabled":{bgcolor:'grey'}}}>Iniciar sesión</Button>
      </form>
    </>
  );
}

export default LoginForm;
