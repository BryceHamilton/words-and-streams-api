const express = require('express');
const streamsController = require('./controller');

const router = express.Router();

router.get('/', streamsController.getAllStreams);
router.get('/:id', streamsController.getStreamById);
router.post('/', streamsController.addStream);
router.delete('/:id', streamsController.deleteStream);

module.exports = router;
