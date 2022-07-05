const Streams = require('./model');

const links = [
  'http://76.75.8.120/mjpg/video.mjpg?fbclid=IwAR0PtjyCJu2nYeETikhx_hqEHtlw-weesrGv3o3EuiP1mzovDCKy5tyeNzk#.XSqhzWT3q-o.link',
  'http://120.51.16.164/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000#.XSuAiWhzcyY.link',
  'http://95.230.82.38:81/mjpg/video.mjpg#.XSqeHIFX_eQ.link',
  'http://216.53.207.43/oneshotimage1?1563074159#.XSqebMEncZA.link',
  'http://142.46.20.23/mjpg/video.mjpg#.XLpUBcNIBU9.link',
  'http://62.99.80.154:81/mjpg/video.mjpg#.XSqe5K2Z0Jw.link',
  'http://83.234.97.117/mjpg/video.mjpg#.XSqfMm5acvI.link',
  'http://50.73.9.194/mjpg/video.mjpg#.XSqhqISpY3U.link',
  'http://76.75.8.120/mjpg/video.mjpg#.XSqhzWT3q-o.link',
  'http://31.161.24.18:8888/mjpg/video.mjpg#.XSqiDEnZgE8.link',
  'http://220.254.136.178/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1563133128#.XSuEyNHi8yM.link',
  'http://115.179.100.76:8080/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1563133199#.XSuFDynlr8g.link',
  'http://84.232.147.36:8080/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER#.XSuFLLrefg0.link',
  'http://180.42.121.14/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1563133442#.XSuGAPf51X8.link',
  'http://86.105.20.42:81/mjpg/video.mjpg#.XSuGL8fV824.link',
  'http://113.35.143.114:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1563133540#.XSuGYR-Y8WU.link',
  'http://202.142.10.11/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1563133568#.XSuGfUivkOc.link',
  'http://187.157.229.132/mjpg/video.mjpg#.XSuG1yzQziY.link',
  'http://183.76.170.60:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1563133744#.XSuHLwcpv-c.link',
  'http://66.57.117.166:8000/mjpg/video.mjpg#.XSuHWjQGkOI.link',
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
