const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generar el token de acceso
  const token = jwt.sign({ user: user.nyAp }, 'secret-key', { expiresIn: '1h' });

  return res.status(200).json({ token });
};

module.exports = {
  login
};