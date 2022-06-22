import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock';
import { getSession, useSession } from "next-auth/react";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { createClient } from '../../services/prismicio'
import { asHTML } from '@prismicio/helpers';
import { useRouter } from "next/router";

const post = { 
  slug: 'my-new-post', 
  title: 'My New Post', 
  content: "<p>Post excerpt</p>", 
  updatedAt: '10 de Abril' 
};

jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../services/prismicio')
jest.mock('@prismicio/helpers')

describe("PostPreview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    });

    render(<Post post={post}/>)

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    
    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subscription'
      },
      status: 'authenticated'
    } as any);
    
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push:pushMock
    } as any)

    render(<Post post={post}/>)
    
    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  })

  it('load initial data', async () => {
    const mockedAsHTML = mocked(asHTML);
    const createClientMocked = mocked(createClient);
    
    mockedAsHTML.mockReturnValueOnce("<p>Post content</p>")    

    createClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce(
        {
          uid: 'my-new-post',
          data: {
            title: [{ type: 'heading', text: 'My new post' }],
            content: [{ type: 'paragraph', text: 'Post content' }]
          },
          last_publication_date: '04-01-2021'
        }
      )
    } as any)

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post'
      }
    } as any);
    
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    );
  })
})