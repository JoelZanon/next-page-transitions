import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';

const Hero = styled.section`
  height: 90vh;
  width: 100%;
  position: relative;
  display: grid;
  place-content: center;
  color: #fff;
  background: #333;

  h1 {
    position: relative;
    z-index: 2;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    filter: saturate(.7) contrast(1.2) brightness(1.2);
    opacity: .7;
  }

`;

const BodyCopy = styled.section`
  padding: 5rem 1rem;
  max-width: 684px;
  width: 100%;
  margin: 0 auto;
`;

export async function getServerSideProps({ params }) {
  const postData = { pageIndex: 1 };
  return {
    props: {
      postData,
    },
  };
}

const myLoader = ({ src, width, quality }) => {
  return `https://cdn.pubhubstudio.com/${src}?w=${width}&q=${quality || 75}`
}

const Home = ({ postData }) => (
  <main>
    <Head>
      <title>Home</title>
      <meta property="og:title" content="Home Page" key="title" />
    </Head>
    <Hero>
      <h1>
        Let's explore some page transitions!
      </h1>
      <Image loader={myLoader} layout="fill" src="bbd1c98a87a9cd5fcea6296bed3548f1.jpeg" />
      {/* <img src="https://source.unsplash.com/user/erondu/1600x900" alt="placeholder" /> */}
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
)
export default Home;
