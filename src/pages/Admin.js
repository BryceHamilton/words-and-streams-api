import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Stream = ({ stream, deleteStream }) => {
  return (
    <li
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: '5px',
        padding: '10px'
      }}
    >
      {/* <Link to={`/stream/${stream._id}`}>{stream.url}</Link> */}
      <a href={stream.url}>{stream.url}</a>
      <button
        style={{ marginLeft: '10px' }}
        onClick={() => deleteStream(stream._id)}
      >
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </li>
  );
};

export default function Admin() {
  const [streams, setStreams] = useState(null);
  const inputRef = useRef();

  const fetchStreams = useCallback(async () => {
    try {
      const res = await axios.get('/streams');
      const { streams } = res.data;
      setStreams(streams);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const addStream = async () => {
    const url = inputRef.current.value;
    console.log('adding', url);
    try {
      await axios.post('/streams', {
        url
      });
    } catch (error) {
      console.error(error);
      return;
    }

    fetchStreams();

    inputRef.current.value = '';
  };

  const deleteStream = async id => {
    try {
      await axios.delete('/streams', {
        id
      });
    } catch (error) {
      console.error(error);
      return;
    }

    fetchStreams();
  };

  if (!streams) return <div />;

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f6f6'
  };

  return (
    <div style={containerStyles}>
      <ul>
        {streams.map(stream => (
          <Stream stream={stream} deleteStream={deleteStream} />
        ))}
      </ul>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <input style={{ width: '75%' }} type="text" ref={inputRef} />
        <button onClick={addStream}>Add</button>
      </div>
    </div>
  );
}
