import { useState, useEffect, useCallback } from 'react';
import randomWords from 'random-words';
import axios from 'axios';

const getNextRandomIdx = (range, lastIdx) => {
  let randomIndex = Math.floor(Math.random() * range);
  while (randomIndex === lastIdx) {
    randomIndex = Math.floor(Math.random() * range);
  }

  return randomIndex;
};

function Stream({ link }) {
  return (
    <img style={{ width: '100vw', height: '100vh' }} src={link} alt="stream" />
  );
}

export default function Home() {
  const [word, setWord] = useState(randomWords());
  const [streamIdx, setStreamIdx] = useState(0);
  const [streams, setStreams] = useState([]);

  const changeWordAndStream = useCallback(() => {
    setWord(randomWords());
    setStreamIdx(lastIdx => getNextRandomIdx(streams.length, lastIdx));
  }, [streams.length]);

  useEffect(() => {
    const fetchStreams = async () => {
      const res = await axios.get('/streams');
      const { streams } = res.data;
      const urls = streams.map(stream => stream.url);
      setStreams(urls);
    };
    fetchStreams();
    document.addEventListener('click', changeWordAndStream);
    return () => {
      document.removeEventListener('click', changeWordAndStream);
    };
  }, [changeWordAndStream]);

  if (streams.length === 0) {
    return <div />;
  }

  return (
    <div>
      <Stream link={streams[streamIdx]} />
      {word}
    </div>
  );
}
