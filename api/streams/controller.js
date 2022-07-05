const Streams = require('./model');

const links = [
  'http://183.76.170.60:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1563133744#.XSuHLwcpv-c.link',
];

const getAllStreams = async (req, res) => {
  try {
    const streams = await Streams.find({}).exec();
    res.status(200).json({ streams: links });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'something went wrong ☹️' });
  }
};

const getStreamById = async (req, res) => {
  const { id } = req.params;
  try {
    const stream = await Streams.findOne({ id }).exec();
    res.status(200).json({ stream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'something went wrong ☹️' });
  }
};

const addStream = async (req, res) => {
  const { url } = req.body;
  try {
    const stream = await Streams.create({ url });
    res.status(200).json({ stream, message: 'steam added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'something went wrong ☹️' });
  }
};

const deleteStream = async (req, res) => {
  const { id } = req.params;
  console.log('deleting', id);
  try {
    await Streams.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: 'stream deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'something went wrong ☹️' });
  }
};

module.exports = {
  getAllStreams,
  getStreamById,
  addStream,
  deleteStream,
};
