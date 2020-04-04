// Requires
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// Importar rutas
let externoRoutes = require('./routes/servicioExterno');
let usuarioRoutes = require('./routes/usuario');
let turnoRoutes = require('./routes/turno');

// Inicializar variables
let app = express();

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// Body-parser configuración
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose
  .connect('mongodb://localhost:27017/turno', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online'))
  .catch((err) => {
    console.log('Error en conexión: ' + err);
  });
mongoose.set('useCreateIndex', true);

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/turno', turnoRoutes);
app.use('/servicioExterno', externoRoutes);

// Escuchar peticiones express
app.listen(3000, () => {
  console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
