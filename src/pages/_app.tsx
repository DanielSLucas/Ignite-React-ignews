import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider } from "next-auth/react"
import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';

import { repositoryName, linkResolver } from '../services/prismicio';

import '../styles/global.scss';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, children, ...props }) => (
          <Link href={href}>
            <a {...props}>
              {children}
            </a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName} >
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
      
    </SessionProvider>
  );
}

export default MyApp
