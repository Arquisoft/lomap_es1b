import { render, screen } from "@testing-library/react";
import { NavBar } from "../NavBar";
import { BrowserRouter as Router} from "react-router-dom";
import { readMarkers } from "../../helpers/SolidHelper";
import { Types } from "../../context/MarkerContextProvider";

test('check the navbar when its not logged in', async () => {
    render (
        <Router>
            <NavBar/>
        </Router>
    );
    
    expect(screen.getByText("Mapa")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
})

test('check the navbar when its logged in', async () => {
    render (
        <Router>
            <NavBar/>
        </Router>
    );
    
    expect(screen.getByText("Mapa")).toBeInTheDocument();
    expect(screen.getByText("Mis ubicaciones")).toBeInTheDocument();
    expect(screen.getByText("Mis amigos")).toBeInTheDocument();
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
})

describe("NavBar", () => {
    test("displays the logo", () => {
        const { getByAltText } = render (
            <Router>
                <NavBar/>
            </Router>
        );
        const logo = getByAltText("logo");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", "/logo-no-background.png");
        expect(logo).toHaveAttribute("alt", "logo");
    })
})



