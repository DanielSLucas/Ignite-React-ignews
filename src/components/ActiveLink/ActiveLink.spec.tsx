import { render } from '@testing-library/react';
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
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );
  
    // debug() // mostra o html gerado como console.log
  
    expect(getByText("Home")).toBeInTheDocument();
  })
  
  it("is receiving 'active' class", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );  
  
    expect(getByText("Home")).toHaveClass('active');
  })
})

