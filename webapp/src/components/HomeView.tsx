import MapView from "./map/MapView";
import { useSession } from '@inrupt/solid-ui-react';

const HomeView = () => {

    const { session } = useSession();

    return (
        session.info.isLoggedIn ?
        <section>
            <div background-color='white'>
                <h1>Bienvenido {session.info.webId?.substring(8).split('.')[0]}!</h1>
                <img src="/logo-no-background.png" width={333} height={207}></img>
            </div>
            <div>
                LoMap es una aplicación que te permitirá crear tus mapas personalizados sobre tus
                lugares y negocios favoritos.
                Podrás explorar las ubicaciones públicas que los usuarios vayan subiendo a su perfil 
                de igual manera que podrás ver exclusivamente tus ubicaciones o las de tus amigos.
                ¡Puntua y comenta los lugares favoritos de todo el mundo!
            </div>
        </section>
        :
        <section>
            <div background-color='white'>
                <h1>Bienvenido!</h1>
                <img src="/logo-no-background.png" width={333} height={207}></img>
            </div>
            <div>
                LoMap es una aplicación que te permitirá crear tus mapas personalizados sobre tus
                lugares y negocios favoritos.
                Podrás explorar las ubicaciones públicas que los usuarios vayan subiendo a su perfil 
                de igual manera que podrás ver exclusivamente tus ubicaciones o las de tus amigos.
                ¡Puntua y comenta los lugares favoritos de todo el mundo!
            </div>
        </section>
    );
}

export default HomeView;
