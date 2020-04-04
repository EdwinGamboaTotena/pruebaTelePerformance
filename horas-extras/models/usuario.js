let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: { type: String, required: [true, 'Nombre requerido'] },
  apellido: { type: String, required: [true, 'Apellido requerido'] },
  documento: { type: String, unique: true, required: [true, 'documento requerido'] },
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} Unique' });

module.exports = mongoose.model('usuario', usuarioSchema);
