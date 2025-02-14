import { useRouter } from 'next/router';
import Link from 'next/link'
import styled from 'styled-components';
import Head from 'next/head';

const StyledHeader = styled.header`
  position: fixed;
  z-index: 9;
  width: 100%;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

const A = styled.a`
  padding: 20px;
  color: #000;
  text-decoration: none;
  cursor: pointer;

  ${props => props.isActive && `
    text-decoration: underline;
  `};
`;

const Header = () => {
  const { route, asPath } = useRouter();
  return (
    <>
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
      </Head>
      <StyledHeader>
        <Link href="/">
          <A isActive={route === '/'}>Home</A>
        </Link>
        <Link href="/about">
          <A isActive={route === '/about'}>About</A>
        </Link>
        <Link href="/contact">
          <A isActive={route === '/contact'}>Contact</A>
        </Link>
      </StyledHeader>
    </>
  );
};


export default Header;
