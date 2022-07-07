import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import sha256 from 'sha256';

const Login = ({ setIsAuthenticated }) => {
  const passwordRef = useRef();

  const ADMIN =
    '5f207a5cb9288ab7b6802da2792f3c09c58e0e30649dc7a2872a23d92981b9af';

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const inputPassword = passwordRef.current.value;
    const hashedPassword = sha256(inputPassword);

    if (hashedPassword === ADMIN) {
      setIsAuthenticated(true);
    }
  };
  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <input type='password' ref={passwordRef} />
        <input type='submit' style={{ display: 'none' }} />
      </form>
    </LoginContainer>
  );
};

const Stream = ({ stream, deleteStream }) => {
  return (
    <StreamListItem>
      {/* <Link to={`/stream/${stream._id}`}>{stream.url}</Link> */}
      {/* <a href={stream.url}>{stream.url}</a> */}
      <a href={stream}>{stream}</a>
      {/* <button onClick={() => deleteStream(stream._id)}>
        <i class='fa fa-trash' aria-hidden='true'></i>
      </button> */}
    </StreamListItem>
  );
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [streams, setStreams] = useState(null);

  const inputRef = useRef();

  const fetchStreams = useCallback(async () => {
    try {
      const res = await axios.get('/streams');
      const { streams } = res.data;
      console.log('fetched streams', streams);
      setStreams(streams);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const addStream = async (ev) => {
    ev.preventDefault();

    const url = inputRef.current.value;
    if (!url) return;

    try {
      await axios.post('/streams', {
        url,
      });
    } catch (error) {
      console.error(error);
      return;
    }

    fetchStreams();

    inputRef.current.value = '';
  };

  const deleteStream = async (id) => {
    try {
      await axios.delete(`/streams/${id}`);
    } catch (error) {
      console.error(error);
      return;
    }

    fetchStreams();
  };

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <Container>
      <ul>
        {streams.map((stream) => (
          <Stream
            key={stream._id}
            stream={stream.url}
            deleteStream={deleteStream}
          />
        ))}
      </ul>
      <CenterForm onSubmit={addStream}>
        <input type='text' ref={inputRef} />
        <button type='submit'>Add</button>
        <input type='submit' style={{ display: 'none' }} />
      </CenterForm>
    </Container>
  );
}

const StreamListItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin: 5px;
  padding: 10px;

  > button {
    margin-left: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f6f6;
`;

const CenterForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  > input {
    width: 75%;
  }
`;

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
