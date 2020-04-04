let express = require('express');
let app = express();

let Turno = require('../models/turno');
let Usuario = require('../models/usuario');

// Obtener todos los turnos
app.get('/', (req, res, next) => {
  Turno.find({})
    .populate({ path: 'usuario', select: 'nombre apellido documento ', model: Usuario })
    .exec((err, turnos) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al encontrar turnos',
          errors: err,
        });
      } else {
        Turno.countDocuments({}, (errorConteo, conteo) => {
          res.status(200).json({
            ok: true,
            turnos,
            total: conteo,
          });
        });
      }
    });
});

// Crear turno
app.post('/', (req, res) => {
  let body = req.body;
  console.log(body);
  let turno = new Turno({
    fechaInicio: new Date(body.fechaInicio),
    fechaFin: new Date(body.fechaFin),
    horarioInicioTurno: body.horarioInicioTurno,
    horarioFinTurno: body.horarioFinTurno,
    horarioInicioHoraExtra: body.horarioInicioHoraExtra,
    horarioFinHoraExtra: body.horarioFinHoraExtra,
    motivoHoraExtra: body.motivoHoraExtra,
    usuario: body.usuario,
  });

  turno.save((err, turnoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al crear turno',
        errors: err,
      });
    } else {
      res.status(201).json({
        ok: true,
        turno: turnoDB,
      });
    }
  });
});

// Actualizar turno
app.put('/:id', (req, res) => {
  let id = req.params.id;
  Turno.findById(id, (err, turno) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al encontrar turno',
        errors: err,
      });
    } else if (!turno) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Error al encontrar turno',
        errors: { mensaje: 'Error al encontrar turno' },
      });
    } else {
      let body = req.body;
      turno.fechaInicio = body.fechaInicio;
      turno.fechaFin = body.fechaFin;
      turno.horarioInicioTurno = body.horarioInicioTurno;
      turno.horarioFinTurno = body.horarioFinTurno;
      turno.horarioInicioHoraExtra = body.horarioInicioHoraExtra;
      turno.horarioFinHoraExtra = body.horarioFinHoraExtra;
      turno.motivoHoraExtra = body.motivoHoraExtra;
      turno.usuario = body.usuario;
      turno.save((errorUpdate, turnoBd) => {
        if (errorUpdate) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar turno',
            errors: errorUpdate,
          });
        } else {
          return res.status(200).json({
            ok: true,
            turno: turnoBd,
          });
        }
      });
    }
  });
});

app.delete('/:id', (req, res) => {
  let id = req.params.id;
  Turno.findByIdAndDelete(id, (err, turnoEliminado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al eliminar el turno',
        errors: err,
      });
    } else if (!turnoEliminado) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Error al encontrar el turno',
        errors: { mensaje: 'Error al encontrar el turno' },
      });
    } else {
      return res.status(200).json({
        ok: true,
        turno: turnoEliminado,
      });
    }
  });
});

module.exports = app;
