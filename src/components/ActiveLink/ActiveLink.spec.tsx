import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe("ActiveLink component", () => {
  it('renders correctly', () => {
    const { debug } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );
  
    // debug() // mostra o html gerado como console.log
  
    expect(screen.getByText("Home")).toBeInTheDocument();
  })
  
  it("is receiving 'active' class", () => {
    render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );  
  
    expect(screen.getByText("Home")).toHaveClass('active');
  })
})

