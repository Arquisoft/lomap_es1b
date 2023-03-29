import { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, Dialog, FormGroup, Stack, TextField } from "@mui/material";

export interface LoginProps {
  open: boolean;
  onClose: () => void;
}

function LoginForm(props: LoginProps): JSX.Element {
  const [oidcIssuer, setOidcIssuer] = useState("inrupt.net");

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
        <FormGroup>
          <TextField
            type="url"
            value={oidcIssuer}
            onChange={e => setOidcIssuer(e.target.value as string)}
            sx={{ bgcolor: 'white' }}
          />
          <LoginButton oidcIssuer={`https://${oidcIssuer}`} redirectUrl="http://localhost:3000">
            <Button variant="contained" >
              Iniciar sesión
            </Button>
          </LoginButton>
        </FormGroup>
      </Stack>
    </Dialog>
  );
}

export default LoginForm;
