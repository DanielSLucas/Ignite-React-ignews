import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return {
        data: null,
        status: 'unauthenticated'
      }
    }
  }
});

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }}/>)

    expect(screen.getByText(/R\$10,00/i)).toBeInTheDocument();
  })
})