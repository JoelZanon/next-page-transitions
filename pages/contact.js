import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';

const Hero = styled.section`
  padding: 200px 1rem 120px;
  display: grid;
  place-content: center;
  text-align: center;
  color: white;
  background: #ccc;

  .image-wrapper {
    position: relative;
    margin: 0 auto 50px;
    height: 300px;
    width: 300px;
    img {
      margin: 0 auto 50px;
      height: 300px;
      width: 300px;
      border-radius: 100%;
      object-fit: cover;
      object-position: left;
    }
  }
`;

const BodyCopy = styled.section`
  padding: 5rem 1rem;
  max-width: 684px;
  width: 100%;
  margin: 0 auto;
`;

const myLoader = ({ src, width, quality }) => {
  return `https://cdn.pubhubstudio.com/${src}?w=${width}&q=${quality || 75}`
}

export async function getServerSideProps({ params }) {
  const postData = { pageIndex: 3 };
  return {
    props: {
      postData,
    },
  };
}

const Contact = ({ postData }) => (
  <main>
    <Head>
      <title>Contact</title>
      <meta property="og:title" content="Contact Page" key="title" />
    </Head>
    <Hero>
      <div className="image-wrapper">
        <Image loader={myLoader} layout="fill" src="ed2b58dccd93eb2e601405ad49b29c92.jpeg" />
      </div>
      {/* <img src="https://source.unsplash.com/user/erondu/900x900" /> */}
      <h1>This is the "Contact" page</h1>
      <Link href="/">Oh go back!</Link>
    </Hero>
    <BodyCopy>
      <p>
        Sunt officiis illum ratione similique et veniam. Nihil laborum sit maxime aut distinctio qui. Impedit expedita impedit autem.
      </p>
      <p>
        Facere sapiente qui cum magnam provident. Dignissimos officiis eos id quidem vel nulla. Libero porro necessitatibus minima quod placeat hic beatae aliquid. Incidunt cupiditate natus maiores recusandae. Quod enim dolores incidunt voluptas perferendis dolorem sit. Dolorem velit amet voluptatem dolorum a.
      </p>
      <p>
        Culpa quisquam et exercitationem. Eveniet porro reprehenderit sequi aperiam commodi nesciunt. Iste qui error natus. Autem id eius magni similique enim officia.
      </p>
      <p>
        Explicabo qui nobis qui omnis praesentium at. Labore enim minus voluptas quia minima et natus. Accusamus id aspernatur non quod rerum ullam dicta.
      </p>
      <p>
        Molestiae quo qui blanditiis similique officia. Corporis ut sint magni recusandae quis iure eius exercitationem. Quasi sint iusto culpa asperiores aspernatur velit commodi. Voluptatem est quo ut. Est vero omnis modi. Minima autem non voluptas fuga quas.
      </p>
    </BodyCopy>

  </main>
);

export default Contact;
