const express = require('express');
const app = express();
const port = 3000;

const validateToken = require('./middlewares/auth.js')

// Middlewares
app.use(express.json());    // Permite que Express entienda el formato JSON

// Rutas
app.use('/auth', require('./routes/auth.routes.js'));
app.use('/users', require('./routes/usuarios.routes.js'));
app.use('/tracks', require('./routes/tracks.routes.js'));
app.get('/', validateToken, (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
