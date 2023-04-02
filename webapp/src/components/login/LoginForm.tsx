import { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, Dialog, FormGroup, Stack, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export interface LoginProps {
  open: boolean;
  onClose: () => void;
}

function LoginForm(props: LoginProps): JSX.Element {
  const [oidcIssuer, setOidcIssuer] = useState<string>("");
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  const seleccionarProveedor = (e: SelectChangeEvent) => {
    setOidcIssuer(e.target.value as string);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
        <FormGroup>
          <Select
            value={oidcIssuer}
            onChange={seleccionarProveedor}
            sx={{ width: '15em' }}
          >
            <MenuItem value={"https://inrupt.net/"}>Inrupt</MenuItem>
            <MenuItem value={"https://solidcommunity.net/"}>SOLID community</MenuItem>
          </Select>
          <LoginButton oidcIssuer={oidcIssuer} redirectUrl="http://localhost:3000">
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
