import { Container } from "@mui/material"
import { useSession } from "@inrupt/solid-ui-react";

const HomeView = () => {
    const { session } = useSession();

    return (
        <Container sx={{ color: 'white', textAlign: 'center' }}>
            <div>
                <h1>¡Bienvenido!</h1>
            </div>
        </Container>
    );
}

export default HomeView;
