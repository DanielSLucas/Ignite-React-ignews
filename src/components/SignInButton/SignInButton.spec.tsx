import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock';
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock('next-auth/react')

describe("SignInButton component", () => {
  it('renders correctly when user is not logged in', () => {
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated'})

    render(
      <SignInButton />
    );    
  
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();    
  })

  it('renders correctly when user is logged in', () => {
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({ 
      data: {
        user: { name: 'John Doe', email: "johnDoe@email.com" },
        expires: "fake-expires"
      }, 
      status: 'authenticated'
    })

    render(
      <SignInButton />
    );    
  
    expect(screen.getByText("John Doe")).toBeInTheDocument();    
  })
})