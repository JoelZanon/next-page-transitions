import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import gsap from 'gsap';

const pageTransitionDuration = 500;

const transitionZoom = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(.6);
  }
  70% {
    transform: scale(.6);
  }
  100% {
    transform: scale(1);
  }
`;

const transitionOutFlip = keyframes`
  from {
    transform: rotateY(0) translateZ(-1px);
    z-index: 4;
  }
  to {
    transform: rotateY(180deg) translateZ(-1px);
    z-index: 0;
  }
`;

const transitionInFlip = keyframes`
  from {
    transform: rotateY(-180deg) translateZ(1px);
  }
  to {
    transform: rotateY(0) translateZ(1px);
    z-index: 4;
  }
`;

const transitionOutSlideToRight = keyframes`
  from {
    transform: translateX(0px)
  }
  to {
    transform: translateX(100vw);
  }
`;

const transitionInSlideFromLeft = keyframes`
  from {
    transform: translateX(-100vw)
  }
  to {
    transform: translateX(0);
  }
`;

const transitionOutSlideToLeft = keyframes`
  from {
    transform: translateX(0px)
  }
  to {
    transform: translateX(-100vw);
  }
`;

const transitionInSlideFromRight = keyframes`
  from {
    transform: translateX(100vw)
  }
  to {
    transform: translateX(0);
  }
`;

const MainComponent = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
  &.page-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backface-visibility: hidden;
  }
  &.page-enter-active,
  &.page-exit-active {
    .page-transition-inner {
      height: 100vh;
      overflow: hidden;
      /* animation: 1000ms ${transitionZoom} cubic-bezier(0.45, 0, 0.55, 1) both; */
      background: white;
    }
  }
  &.page-exit-active {
    main {
      transform: translateY(-${props=>props.routingPageOffset}px);
    }
    backface-visibility: hidden;
  }
`;

const SecondaryComponent = styled.div`
  position: relative;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const WrapperComponent = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
  /* &.going-left {
    ${MainComponent} {
      &.page-enter-active {
        animation: 500ms ${transitionInSlideFromLeft} 250ms cubic-bezier(0.37, 0, 0.63, 1) both;
      }
      &.page-exit-active {
        animation: 500ms ${transitionOutSlideToRight} 250ms cubic-bezier(.37, 0, .63, 1) both;
      }
    }
  }
  &.going-right {
    ${MainComponent} {
      &.page-enter-active {
        animation: 500ms ${transitionInSlideFromRight} 250ms cubic-bezier(0.37, 0, 0.63, 1) both;
      }
      &.page-exit-active {
        animation: 500ms ${transitionOutSlideToLeft} 250ms cubic-bezier(.37, 0, .63, 1) both;
      }
    }
  } */
`;

let currentPageNavigationIndex = null;
let newPageNavigationIndex = null;

const PageTransitions = ({ children, route, routingPageOffset }) => {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState();
  const [currentPageIndex, setCurrentPageIndex] = useState(children?.props?.postData?.pageIndex);
  const [goingLeft, setGoingLeft] = useState();
  const [goingRight, setGoingRight] = useState();

  const timeline = useRef();
  const transitionRef = useRef();

  const playTransition = () => {
    setTransitioning(true);
  };
  const stopTransition = () => {
    setTransitioning();
  };

  if (!currentPageNavigationIndex) {
    currentPageNavigationIndex = currentPageIndex;
  }
  const onExitedStart = (element) => {
    currentPageNavigationIndex = newPageNavigationIndex;
  }
  const onExitStart = (element) => {
    setTransitioning();
    let xPos = currentPageNavigationIndex > newPageNavigationIndex ? 100 : -100;
    gsap.timeline({})
    .to(element, { xPercent: xPos, duration: pageTransitionDuration / 1000 });
  };
  const onEnterStart = (element) => {
    setTransitioning(true);
    newPageNavigationIndex = parseInt(element['id'], 10);
    let xPos = currentPageNavigationIndex > newPageNavigationIndex ? -100 : 100;
    gsap.timeline({})
    .from(element, { xPercent: xPos, duration: pageTransitionDuration / 1000 });
  };

  useEffect(() => {
    if (currentPageIndex && router?.components[route]?.props?.pageProps?.postData?.pageIndex > currentPageIndex) {
      setGoingLeft(false);
      setGoingRight(true);
    } else if (currentPageIndex && router?.components[route]?.props?.pageProps?.postData?.pageIndex < currentPageIndex) {
      setGoingLeft(true);
      setGoingRight(false);
    }
    setCurrentPageIndex(router?.components[route]?.props?.pageProps?.postData?.pageIndex);
  }, [transitioning]);

  return (
    <WrapperComponent className={`${goingLeft ? 'going-left' : ''} ${goingRight ? 'going-right' : ''}`}>
      <TransitionGroup className={`${transitioning ? 'transitioning' : ''}`}>
        <CSSTransition
            key={route}
            classNames="page"
            timeout={pageTransitionDuration}
            // onEnter={playTransition}
            // onExited={stopTransition}
            onEnter={onEnterStart}
            onExit={onExitStart}
            onExited={onExitedStart}
          >
          <MainComponent id={children?.props?.postData?.pageIndex} routingPageOffset={routingPageOffset}>
            <SecondaryComponent className={`page-transition-inner`}>
              {children}
            </SecondaryComponent>
          </MainComponent>
        </CSSTransition>
      </TransitionGroup>
    </WrapperComponent>
  )
};

export default PageTransitions;