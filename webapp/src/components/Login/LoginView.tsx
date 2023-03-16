import LoginForm from './LoginForm';
import { useState, useContext } from 'react';
import { Stack, Box, Button } from '@mui/material';
import { useSession } from '@inrupt/solid-ui-react';
import { LogoutButton } from "@inrupt/solid-ui-react";
import { readMarkers } from '../../helpers/SolidHelper';
import { MarkerContext, Types } from '../../context/MarkerContextProvider';

export const LoginView = () => {
    const { session } = useSession();
    const { dispatch } = useContext(MarkerContext);
    const [isLogged, setIsLogged] = useState(false);

    session.onLogin(async () => {
        setIsLogged(true);
        dispatch({ type: Types.SET_MARKER, payload: { markers: await readMarkers(session.info.webId!) } });
    })

    return (
        !isLogged ?
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end'>
                <LoginForm />
            </Stack>
            :
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Box component="p" color={'white'}>{session.info.webId?.substring(8).split('.')[0]}</Box>
                <LogoutButton onLogout={() => setIsLogged(false)}>
                    <Button variant="contained" color="primary">
                        Cerrar sesión
                    </Button>
                </LogoutButton>
            </Stack>
    )
}
