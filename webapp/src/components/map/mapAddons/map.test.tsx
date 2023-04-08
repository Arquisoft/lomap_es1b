import { render, screen } from "@testing-library/react";
import MapView from "./MapView";

test("Map component rendered", async () => {
    render(<MapView />)
    const el = screen.getByRole("region");
    expect(el).toBeInTheDocument();
})

// describe("Map component", () => {
//     it("should render Map component correctly", () => {
//         
//         const element = screen.getByRole("region");
//         expect(element).toBeInTheDocument();
//     });
// });