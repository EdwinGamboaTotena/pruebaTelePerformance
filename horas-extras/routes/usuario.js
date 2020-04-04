let express = require('express');
let app = express();

let Usuario = require('../models/usuario');

// Obtener todos los usuarios
app.get('/', (req, res, next) => {
  Usuario.find({}, 'nombre apellido documento').exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Erro al encontrar usuarios',
        errors: err,
      });
    } else {
      Usuario.countDocuments({}, (errorConteo, conteo) => {
        res.status(200).json({
          ok: true,
          usuarios,
          total: conteo,
        });
      });
    }
  });
});

// Obtener usuario por id
app.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Usuario.findById(id, 'nombre apellido documento').exec((err, usuario) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al encontrar usuario',
        errors: err,
      });
    } else {
      res.status(200).json({
        ok: true,
        usuario,
      });
    }
  });
});

// Crear usuario
app.post('/', (req, res) => {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
    documento: body.documento,
  });

  usuario.save((err, usuarioBd) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al crear usuario',
        errors: err,
      });
    } else {
      res.status(201).json({
        ok: true,
        usuario: usuarioBd,
      });
    }
  });
});

// Actualizar usuario
app.put('/:id', (req, res) => {
  let id = req.params.id;
  Usuario.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al actualizar usuario',
        errors: err,
      });
    } else if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Error al encontrar usuario',
        errors: { mensaje: 'Error al encontrar usuario' },
      });
    } else {
      let body = req.body;
      usuario.nombre = body.nombre;
      usuario.apellido = body.apellido;
      usuario.documento = body.documento;
      usuario.save((errorCreate, usuarioBd) => {
        if (errorCreate) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar usuario',
            errors: errorCreate,
          });
        } else {
          usuarioBd.password = '';
          return res.status(200).json({
            ok: true,
            usuario: usuarioBd,
          });
        }
      });
    }
  });
});

// Eliminar usuario
app.delete('/:id', (req, res) => {
  let id = req.params.id;
  Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al eliminar el usuario',
        errors: err,
      });
    } else if (!usuarioEliminado) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Error al encontrar el usuario',
        errors: { mensaje: 'Error al encontrar el usuario', usuarioEliminado },
      });
    } else {
      usuarioEliminado.password = '';
      return res.status(200).json({
        ok: true,
        usuario: usuarioEliminado,
      });
    }
  });
});

module.exports = app;
