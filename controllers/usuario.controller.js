const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({ select: { nyAp: true } });

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    select: { nyAp: true, email: true },
    where: { id: Number(id) }
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

const create = async (req, res) => {
  const { email, nyAp, password } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    await prisma.user.create({
      data: {
        email,
        nyAp,
        password: hashedPassword
      }
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  create
};