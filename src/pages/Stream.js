import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Stream() {
  const [stream, setStream] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchStream = async () => {
      const response = await axios.get(`/streams/${id}`);
      const { stream } = response.data;
      setStream(stream);
    };
    fetchStream();
  }, [id]);

  const fullScreen = { height: '100vh', width: '100vw' };

  if (!stream) return <div />;

  return <img style={fullScreen} src={stream.url} alt="stream" />;
}
