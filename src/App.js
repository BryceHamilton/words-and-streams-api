import { useState, useEffect } from 'react';
import randomWords from 'random-words';

const streams = [
  'http://194.208.63.44:85/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.XSqRMEqKZOY.link',
  'http://194.208.63.44:85/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.XSqRMEqKZOY.link',
  'http://208.72.70.171/mjpg/video.mjpg?fbclid=IwAR3paVjo4Bk9RkuwDdt4k9RmN4gXJVZdCajd-mi19wgmUCz-_zKP_stbM-0#.XSqRrwoegxI.link',
  'http://138.118.33.201:80/mjpg/video.mjpg',
  'http://209.194.208.53/mjpg/video.mjpg?fbclid=IwAR1YA03nMsMJ15k0Y8MGsiWzFoCtwgs5rVuhEaMO_eJHeZ4YeX0ncI-R7nE#.XSqd5uo4vZA.link',
  'http://76.75.8.120/mjpg/video.mjpg?fbclid=IwAR0PtjyCJu2nYeETikhx_hqEHtlw-weesrGv3o3EuiP1mzovDCKy5tyeNzk#.XSqhzWT3q-o.link'
];

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

function App() {
  const [word, setWord] = useState(randomWords());
  const [streamIdx, setStreamIdx] = useState(0);

  const changeWordAndStream = () => {
    setWord(randomWords());
    setStreamIdx(getNextRandomIdx());
  };

  useEffect(() => {
    document.addEventListener('click', changeWordAndStream);
    return () => {
      document.removeEventListener('click', changeWordAndStream);
    };
  }, []);

  return (
    <div>
      <Stream link={streams[streamIdx]} />
      {word}
    </div>
  );
}

export default App;
