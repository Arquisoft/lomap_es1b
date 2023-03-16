import { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, Container, FormGroup, TextField } from "@mui/material";

function LoginForm(): JSX.Element {
  const [idp, setIdp] = useState("https://inrupt.net");

  return (
    <Container fixed>
      <FormGroup>
        <TextField
          label="Identity Provider"
          placeholder="Identity Provider"
          type="url"
          value={idp}
          onChange={(e) => setIdp(e.target.value)}
          InputProps={{
            endAdornment: (
              <LoginButton oidcIssuer={idp} redirectUrl="http://localhost:3000">
                <Button variant="contained" color="primary">
                  Iniciar sesión
                </Button>
              </LoginButton>
            ),
          }}
        />
      </FormGroup>
    </Container>
  );
}

export default LoginForm;
