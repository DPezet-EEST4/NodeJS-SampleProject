const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTracks = async (req, res) => {
  const tracks = await prisma.track.findMany();

  return res.status(200).json(tracks);
};

const getTrackById = async (req, res) => {
  const { id } = req.params;

  const track = await prisma.track.findUnique({ where: { id: Number(id) } });

  if (!track) {
    return res.status(404).json({
      message: 'Track not found'
    });
  }

  return res.status(200).json(track);
};

const createTrack = async (req, res) => {
  const { nombre, genero, autor, url } = req.body;

  try {
    const track = await prisma.track.create({
      data: {
        nombre,
        genero,
        autor,
        url
      }
    });

    return res.status(201).json(track);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating track' });
  }
};

const deleteTrack = async (req, res) => {
  const { id } = req.params;

  await prisma.track.delete({ where: { id: Number(id) } });

  return res.status(200).json({ message: 'Track deleted' });
};

const updateTrack = async (req, res) => {
  const { id } = req.params;
  const { nombre, genero, autor, url } = req.body;

  await prisma.track.update({
    where: { id: Number(id) },
    data: {
      nombre,
      genero,
      autor,
      url
    }
  });

  return res.status(200).json({ message: 'Track updated' });
};

module.exports = {
  getAllTracks,
  getTrackById,
  createTrack,
  deleteTrack,
  updateTrack
};