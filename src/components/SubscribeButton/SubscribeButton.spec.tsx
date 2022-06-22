import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from 'jest-mock';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { SubscribeButton } from ".";

jest.mock('next-auth/react');
jest.mock('next/router');

describe("SubscribeButton component", () => {
  it('renders correctly', () => {        
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated'})

    render(<SubscribeButton />);    
  
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();    
  })

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);
    
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated'})

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  })

  it('redirects to "/posts" when user alredy has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        user: { name: 'John Doe', email: "johnDoe@email.com" },
        activeSubscription: 'fake-activeSubscription',
        expires: "fake-expires"
      }, 
      status: 'authenticated'
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<SubscribeButton />);
    
    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  })
})