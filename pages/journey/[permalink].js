import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
// var parseHtml = require('html-react-parser');

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

const Main = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0
  }
`;

export async function getServerSideProps({ params }) {
  const journeyData = {
    pages: [
      { pageIndex: 0, permalink: 'home', title: 'Let\'s explore some page transitions!', image: 'bbd1c98a87a9cd5fcea6296bed3548f1.jpeg', bodyCopy: `<p>
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
    </p>` },
      { pageIndex: 1, permalink: 'about', title: 'This is the "About" page', image: '9e2a5a04da34e43e0aa9a0ad54f701cd.jpeg', bodyCopy: `<p>
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
    </p>`  },
      { pageIndex: 2, permalink: 'contact', title: 'This is the "Contact" page', image: 'ed2b58dccd93eb2e601405ad49b29c92.jpeg', bodyCopy: `<p>
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
    </p>`  },
    ]
  };
  return {
    props: {
      journeyData,
    },
  };
}

const myLoader = ({ src, width, quality }) => {
  return `https://cdn.pubhubstudio.com/${src}?w=${width}&q=${quality || 75}`
}

const Page = ({ journeyData }) => {
  const router = useRouter();
  let currentPageIndex = null;

  const goLeft = () => {
    let newPermalink = journeyData?.pages?.[currentPageIndex - 1]?.permalink;
    if (newPermalink) {
      router.push(`/journey/${newPermalink}`, undefined, { shallow: true });
      // currentPageIndex = currentPageIndex - 1;
    }
  };
  const goRight = () => {
    let newPermalink = journeyData?.pages?.[currentPageIndex + 1]?.permalink;
    if (newPermalink) {
      router.push(`/journey/${newPermalink}`, undefined, { shallow: true });
      // currentPageIndex = currentPageIndex + 1;
    }
  };
  if (journeyData?.pages?.length > 0) {
    journeyData.pages.forEach((page, index) => {
      if (page.permalink == router?.query?.permalink) {
        currentPageIndex = index;
      }
    });
    return (
      <>
        {journeyData?.pages?.map((page, index) => {
          if (index == currentPageIndex) {
            return (
              <Main key={page.pageIndex} style={{
                left: page.xPos
              }}>
                  <Head>
                    <title>{page.permalink}</title>
                    <meta property="og:title" content={page.permalink} key="title" />
                  </Head>
                <Hero>
                  <h1>
                    {page.title}
                  </h1>
                  <Image loader={myLoader} layout="fill" src={page.image} />
                </Hero>
                <BodyCopy dangerouslySetInnerHTML={{__html:page.bodyCopy}}>
                  {/* {parseHtml(page.bodyCopy)} */}
                </BodyCopy>
              </Main>
            );
          } else {
            return <main key={page.pageIndex}></main>;
          }
        })}
        {}
        {journeyData?.pages?.[currentPageIndex - 1]?.permalink && (
          <button style={{
            position: 'fixed',
            top: '50vh',
            width: '5rem',
            height: '2rem',
            background: '#fff',
            border: 'none'
          }} onClick={goLeft}>Previous</button>
        )}
        {journeyData?.pages?.[currentPageIndex + 1]?.permalink && (
          <button  style={{
            position: 'fixed',
            top: '50vh',
            right: 0,
            width: '5rem',
            height: '2rem',
            background: '#fff',
            border: 'none'
          }} onClick={goRight}>Next</button>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default Page;
