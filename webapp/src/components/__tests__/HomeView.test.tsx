import { getByText, render, screen } from "@testing-library/react";
import { renderHook } from '@testing-library/react-hooks';
import HomeView from "../HomeView";
import { useSession } from "@inrupt/solid-ui-react";

test('check that HomeView not logged in is rendering propertly', async () => {
    render(<HomeView />);
    const element = screen.getByText("¡Bienvenido!");
    expect(element).toBeInTheDocument();
});

test('check that HomeView logged in is rendering propertly', async () => {
    render(<HomeView />);
    const element = screen.getByText("¡Bienvenido, pruebadeid!");
    expect(element).toBeInTheDocument();
});
