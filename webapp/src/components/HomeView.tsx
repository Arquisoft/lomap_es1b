import { Container } from "@mui/material"
import { useSession } from "@inrupt/solid-ui-react";

const HomeView = () => {
    const { session } = useSession();

    return (
        <Container sx={{ color: 'white', verticalAlign: 'middle', display: 'flex', margin: '0', padding: '0 !important' }}>
            <figure>
                <img src='dalle.png' alt='Imagen generada por DALL-E' style={{ width: '20em', height: '50em' }} />
                <figcaption>Imagen generada por la IA "DALL-E".</figcaption>
            </figure>
            <div style={{ textAlign: 'justify', paddingRight: "15em" }}>
                {session.info.isLoggedIn ? <h1>¡Bienvenido, {session.info.webId?.substring(8).split('.')[0]}!</h1> : <h1>¡Bienvenido!</h1>}
                <p>
                    LoMap permite a los ciudadanos disponer de mapas personalizados de lugares y negocios locales de su ciudad.
                    Los lugares que podrán cartografiarse incluyen tiendas, bares, restaurantes, monumentos y atracciones culturales, entre otros.
                    Los usuarios tendrán pleno control sobre sus mapas personalizados y la información compartida se almacenará en un pod personal
                    de acuerdo con los principios SOLID.
                </p>
                <p>
                    La imagen que puedes observar a la izquierda es una representación abstracta
                    de nuestra página realizada por la inteligencia artificial "DALL-E",
                    empleando los colores insignia de esta.
                </p>
            </div>
        </Container>
    );
}

export default HomeView;
