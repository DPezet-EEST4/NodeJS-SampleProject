const express = require('express');
const router = express.Router();

// Middlewares
const validateToken = require('../middlewares/auth.js');

// Controlador de los tracks
const tracksController = require('../controllers/track.controller.js');

router.get('/', tracksController.getAllTracks);
router.get('/:id', tracksController.getTrackById);
router.post('/', validateToken, tracksController.createTrack);
router.delete('/:id', validateToken , tracksController.deleteTrack);
router.put('/:id', validateToken, tracksController.updateTrack);

module.exports = router;