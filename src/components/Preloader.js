import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const PreloaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
`;

const Triangle = styled.svg`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const TrianglePath = styled(motion.path)`
  fill: transparent;
  stroke: #fff;
  stroke-width: 8;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const moveLights = keyframes`
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -300; }
`;

const Lights = styled(TrianglePath)`
  stroke: url(#grad);
  stroke-dasharray: 250;
  animation: ${moveLights} 4s linear infinite;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-top: 20px;
  text-align: center;
`;

const Preloader = () => {
  const loadingMessages = ["Loading.", "Loading..", "Loading...", "Hang tight!!"];
  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % loadingMessages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PreloaderWrapper>
      <Triangle viewBox="0 0 100 100">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'black', stopOpacity: 0.5 }} />
            <stop offset="50%" style={{ stopColor: 'cyan', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'cyan', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <TrianglePath d="M 50,90 L 10,20 L 90,20 Z" />
        <Lights d="M 50,90 L 10,20 L 90,20 Z" />
      </Triangle>
      <LoadingText>
        {loadingMessages[currentMessage]}
      </LoadingText>
    </PreloaderWrapper>
  );
};

export default Preloader;
