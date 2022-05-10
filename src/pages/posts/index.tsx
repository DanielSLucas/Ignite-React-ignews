import { GetStaticProps } from 'next';
import Head from 'next/head';
import { asText } from '@prismicio/helpers';

import { createClient } from '../../services/prismicio';

import styles from '../../styles/posts.module.scss';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}
interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/preview/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>
                  {post.excerpt}
                </p>
              </a>
            </Link>
          ))}
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

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',  {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  })

  return {
    props: {
      posts,
    },
  };
}