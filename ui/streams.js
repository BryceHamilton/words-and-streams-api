let randomWords;
let streamUrls;

const initialWords = [
  'air',
  'death',
  'grass',
  'apple',
  'laid',
  'effect',
  'enter',
  'particularly',
  'hunter',
  'grabbed',
  'angry',
  'win',
  'remember',
  'lose',
  'mighty',
  'involved',
  'fun',
  'balance',
  'angle',
  'complex',
  'grabbed',
  'end',
  'crop',
  'capital',
  'entire',
  'mistake',
  'adult',
  'has',
  'torn',
  'southern',
  'moment',
  'positive',
  'women',
  'duty',
  'arrive',
  'welcome',
  'anything',
  'record',
  'snake',
  'cup',
  'slight',
  'block',
  'shelf',
  'series',
  'noise',
  'that',
  'continued',
  'felt',
  'bound',
  'shop',
  'outline',
  'under',
  'voyage',
  'alive',
  'team',
  'soon',
  'herself',
  'should',
  'hang',
  'remain',
  'your',
  'choice',
  'softly',
  'hunter',
  'safety',
  'oxygen',
  'age',
  'out',
  'individual',
  'paper',
  'pencil',
  'bean',
  'completely',
  'hay',
  'knowledge',
  'written',
  'during',
  'mother',
  'stay',
  'continued',
  'pen',
  'outline',
  'struggle',
  'been',
  'blue',
  'courage',
  'neighbor',
  'fastened',
  'direction',
  'case',
  'map',
  'army',
  'brown',
  'yard',
  'became',
  'did',
  'table',
  'produce',
  'against',
  'go',
];

const init = () => {
  fetchStreams();
  getRandom();
  setInterval(getRandom, 20000);
  changeWordAndStream();
};

const getRandom = async () => {
  const response = await fetch('/randomWord');
  const words = await response.json();
  randomWords = words;
};

const fetchStreams = async () => {
  const res = await fetch('/streams');
  const { streams } = await res.json();
  streamUrls = streams.map((stream) => {
    const stream = document.createElement('img');
    stream.src = stream.url;
    stream.id = 'stream';
    stream.onerror = function () {
      console.log('failed');
      changeWordAndStream();
    };
    return stream;
  });
};

let lastStreamIndex;
let lastWordIndex;

const changeWordAndStream = () => {
  const streams = streamUrls;
  randomIndex = Math.floor(Math.random() * streams.length); // number between 0 and the number of streams
  while (randomIndex === lastStreamIndex) {
    randomIndex = Math.floor(Math.random() * streams.length);
  }

  const streamDiv = document.getElementById('left');
  streamDiv.innerHTML = '';
  streamDiv.appendChild(streams[randomIndex]);

  console.log(streams[randomIndex].src);

  lastStreamIndex = randomIndex;

  randomIndex = Math.floor(Math.random() * randomWords.length); // number between 0 and the number of streams
  while (randomIndex === lastWordIndex) {
    randomIndex = Math.floor(Math.random() * randomWords.length);
  }

  const textDiv = document.getElementById('text');
  textDiv.innerHTML = randomWords[randomIndex];

  lastWordIndex = randomIndex;
};

document.addEventListener('click', changeWordAndStream);
