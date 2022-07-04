import { useState, useEffect, useCallback } from 'react';
import randomWords from 'random-words';
import axios from 'axios';
import styled from 'styled-components';

const getNextRandomIdx = (range, lastIdx) => {
  let randomIndex = Math.floor(Math.random() * range);
  while (randomIndex === lastIdx) {
    randomIndex = Math.floor(Math.random() * range);
  }

  return randomIndex;
};

function Stream({ link, isLoaded, setIsLoaded, changeWordAndStream }) {
  const imageStyles = { visibility: isLoaded ? '' : 'hidden' };
  return (
    <img
      src={link}
      style={imageStyles}
      alt='stream'
      onLoad={() => {
        setIsLoaded && setIsLoaded(true);
      }}
      onError={() => {
        console.error('failed', link);
        changeWordAndStream();
      }}
    />
  );
}

export default function Home() {
  const [word, setWord] = useState(randomWords());
  const [streamIdx, setStreamIdx] = useState(0);
  const [streams, setStreams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  const changeWordAndStream = useCallback(() => {
    setIsLoaded(false);
    setWord(randomWords());
    setStreamIdx((lastIdx) => getNextRandomIdx(streams.length, lastIdx));
  }, [streams.length]);

  useEffect(() => {
    const fetchStreams = async () => {
      const res = await axios.get('/streams');
      const { streams } = res.data;
      const urls = streams.map((stream) => stream.url);
      setStreams(urls);
    };
    fetchStreams();
    document.addEventListener('click', changeWordAndStream);
    return () => {
      document.removeEventListener('click', changeWordAndStream);
    };
  }, [changeWordAndStream]);

  console.log(streams);

  if (!isClicked) {
    return <button onClick={() => setIsClicked(true)}>click</button>;
  }

  if (streams.length === 0) return <div />;

  if (!isLoaded)
    return (
      <Container>
        <Stream
          link={streams[streamIdx]}
          isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
          changeWordAndStream={changeWordAndStream}
        />
      </Container>
    );

  return (
    <Container>
      <Stream
        link={streams[streamIdx]}
        isLoaded={isLoaded}
        changeWordAndStream={changeWordAndStream}
      />
      <WordContainer>{word}</WordContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: black;

  > div,
  > img {
    width: 50%;
    height: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    > div,
    > img {
      width: 100%;
      height: 50%;
    }
  }
`;

const WordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
