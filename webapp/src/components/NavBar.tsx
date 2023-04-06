import { Link } from "react-router-dom";
import LoginForm from './login/LoginForm';
import { useState, useContext } from 'react';
import { IPMarker } from "../shared/SharedTypes";
import { Stack, Box, Button } from '@mui/material';
import { useSession } from '@inrupt/solid-ui-react';
import { readMarkers } from '../helpers/SolidHelper';
import { LogoutButton } from "@inrupt/solid-ui-react";
import { MarkerContext, Types } from '../context/MarkerContextProvider';

export const NavBar = () => {
    const { session } = useSession();
    const [open, setOpen] = useState(false);
    const { dispatch } = useContext(MarkerContext);

    session.onLogin(async () => {
        setMarkers(await readMarkers(session.info.webId!));
    })

    session.onLogout(async () => {
        setMarkers([])
    })

    function setMarkers(markers: IPMarker[]) {
        dispatch({ type: Types.SET_MARKERS, payload: { markers: markers } });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <nav>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                alignItems='center'
                justifyContent='left'
            >
                <Link to="/"><img src="/logo-no-background.png" className="App-logo" alt="logo" height="60" /></Link>
                <Link to="/map">Mapa</Link>
                {session.info.isLoggedIn ?
                    <>
                        <Link to="/ubications">Mis ubicaciones</Link>
                        <Link to="/friends">Mis amigos</Link>
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
                            <Box component="p" color={'white'}>{session.info.webId?.substring(8).split('.')[0]}</Box>
                            <LogoutButton>
                                <Button variant="contained" sx={{ margin: "1em", marginLeft: "0em" }}>
                                    Cerrar sesión
                                </Button>
                            </LogoutButton>
                        </Stack>
                    </>
                    : <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Button variant="contained" onClick={handleClickOpen} sx={{ margin: "1em" }}>
                            Iniciar sesión
                        </Button>
                        <LoginForm
                            open={open}
                            onClose={handleClose}
                        />
                    </Stack>}
            </Stack>
        </nav>
    )
}
