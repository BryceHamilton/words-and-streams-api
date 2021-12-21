const Streams = require('./model');

const getAllStreams = async (req, res) => {
  try {
    const streams = await Streams.find({}).exec();
    res.status(200).json({ streams });
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
    const stream = await Streams.create({ url }).exec();
    res.status(200).json({ stream, message: 'steam added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'something went wrong ☹️' });
  }
};

const deleteStream = async (req, res) => {
  const { id } = req.params;
  try {
    await Streams.deleteOne({ id }).exec();
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
  deleteStream
};
