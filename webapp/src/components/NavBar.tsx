import LoginForm from './login/LoginForm';
import { useState, useContext } from 'react';
import { Stack, Box, Button } from '@mui/material';
import { useSession } from '@inrupt/solid-ui-react';
import { LogoutButton } from "@inrupt/solid-ui-react";
import { readMarkers } from '../helpers/SolidHelper';
import { MarkerContext, Types } from '../context/MarkerContextProvider';
import { Link } from "react-router-dom";

export const NavBar = () => {
    const { session } = useSession();
    const { dispatch } = useContext(MarkerContext);
    const [isLogged, setIsLogged] = useState(false);
    const [open, setOpen] = useState(false);

    session.onLogin(async () => {
        setIsLogged(true);
        dispatch({ type: Types.SET_MARKER, payload: { markers: await readMarkers(session.info.webId!) } });
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        !isLogged ?
            <nav>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    alignItems='center'
                    justifyContent='left'
                >
                    <Link to="/"><img src="/logo-no-background.png" className="App-logo" alt="logo" height="60" /></Link>
                    <Link to="/map">Mapa</Link>
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Iniciar sesión
                        </Button>
                        <LoginForm
                            open={open}
                            onClose={handleClose}
                        />
                    </Stack>
                </Stack>
            </nav>

            :
            <nav>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    alignItems='center'
                    justifyContent='left'
                >
                    <Link to="/"><img src="/logo-no-background.png" className="App-logo" alt="logo" height="60" /></Link>
                    <Link to="/map">Mapa</Link>
                    <Link to="/ubications">Mis ubicaciones</Link>
                    <Link to="/friends">Mis amigos</Link>
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Box component="p" color={'white'}>{session.info.webId?.substring(8).split('.')[0]}</Box>
                        <LogoutButton onLogout={() => setIsLogged(false)}>
                            <Button variant="contained">
                                Cerrar sesión
                            </Button>
                        </LogoutButton>
                    </Stack>
                </Stack>
            </nav>

    )
}
