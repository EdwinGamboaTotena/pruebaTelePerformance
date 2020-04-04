let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let turnoSchema = new Schema(
  {
    fechaInicio: { type: Date, required: [true, 'Fecha inicio requerida'] },
    fechaFin: { type: Date, required: [true, 'Fecha fin requerida'] },
    horarioInicioTurno: { type: String, required: [true, 'Horario inicio turno requerido'] },
    horarioFinTurno: { type: String, required: [true, 'Horario fin turno requerido'] },
    horarioInicioHoraExtra: { type: String, required: [true, 'Horario inicio hora extra requerido'] },
    horarioFinHoraExtra: { type: String, required: [true, 'Horario fin hora extra requerido'] },
    motivoHoraExtra: { type: String, required: [true, 'El motivo de las horas extras es requerido'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  },
  { collection: 'turnos' }
);
module.exports = mongoose.model('Turno', turnoSchema);
