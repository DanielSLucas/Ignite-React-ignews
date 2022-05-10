import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import { createClient } from '../../services/prismicio';

import styles from '../../styles/posts.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo wiht Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn hwo to create a Monorepo to manage multriple packaeges
              with a shared build, test, and release process.
            </p>
          </a>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo wiht Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn hwo to create a Monorepo to manage multriple packaeges
              with a shared build, test, and release process.
            </p>
          </a>
          <a href='#'>
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo wiht Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn hwo to create a Monorepo to manage multriple packaeges
              with a shared build, test, and release process.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({previewData}) => {
  const prismic = createClient({ previewData });

  const response = await prismic.getAllByType('posts', {
    fetch: ['posts.title', 'posts.content'],
    pageSize: 100, 
  });
  
  console.log(response);

  return {
    props: {}
  }
}