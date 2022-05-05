import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from '../styles/home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>Reactg</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {  
  // pegar um produto (retrive) por id (API ID do produto)
  // como segundo parâmetro poderiamos passar um objeto com a proprieadade
  // expand: ["product"] que permitiria pegar mais informações do produto
  const price = await stripe.prices.retrieve("price_1Kw7fLAMeuVPVRTo7JeLdfkk");
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100), // cents/100 = dolars
  }

  return {
    props: {
      product
    }
  }
}