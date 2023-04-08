import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../login/LoginForm";
const mockHandleClose = jest.fn();

test("Proper render of login form component", () => {

    const form = render(
        <LoginForm open={true} onClose={mockHandleClose} />  
    );

    expect(screen.getByText("Por favor, seleccione un proveedor.")).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Inrupt")).toBeInTheDocument();
})

test("Proper close of the form", () => {
    const form = render(
        <LoginForm open={false} onClose={mockHandleClose} />  
    );

    

})

