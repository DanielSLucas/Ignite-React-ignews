import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import AsyncExample from ".";

test("It renders correctly", async () => {
  render(<AsyncExample />);

  expect(screen.getByText("Hello world")).toBeInTheDocument();
  // expect(await screen.findByText("Button")).toBeInTheDocument();

  await waitFor(() => {
    return expect(screen.getByText("Button 1")).toBeInTheDocument();
  });

  await waitForElementToBeRemoved(screen.queryByText('Button 2'), { timeout: 3000 });
});