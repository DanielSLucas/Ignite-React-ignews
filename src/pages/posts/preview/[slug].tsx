import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { asHTML } from "@prismicio/helpers";
import { asText } from "@prismicio/richtext";
import { useSession } from "next-auth/react";

import { createClient } from "../../../services/prismicio";

import styles from '../../../styles/post.module.scss';
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session])  
  
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>
                Subscribe now 🤗
              </a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ previewData, params }) => {
  const { slug } = params;

  const prismic = createClient({ previewData });

  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    slug,
    title:  asText(response.data.title),
    content: asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',  {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
}