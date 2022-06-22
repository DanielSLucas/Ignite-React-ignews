import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock';
import { getSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { createClient } from '../../services/prismicio'
import { asHTML } from '@prismicio/helpers';

const post = { 
  slug: 'my-new-post', 
  title: 'My New Post', 
  content: "<p>Post excerpt</p>", 
  updatedAt: '10 de Abril' 
};

jest.mock('next-auth/react');
jest.mock('../../services/prismicio')
jest.mock('@prismicio/helpers')

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post}/>)

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);
    
    getSessionMocked.mockResolvedValueOnce(null)
    
    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any);
    
    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({          
          destination: '/',                      
        }),
      })
    );
  })

  it('load initial data', async () => {
    const mockedAsHTML = mocked(asHTML);
    const createClientMocked = mocked(createClient);
    const getSessionMocked = mocked(getSession);
    
    mockedAsHTML.mockReturnValueOnce("<p>Post content</p>")

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any);

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

    const response = await getServerSideProps({
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