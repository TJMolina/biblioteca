import {Schema, model, models } from "mongoose";
const schemaPedido = new Schema({
  profesor: String,
  solicitante: String,
  especialidad: String,
  year: String,
  divicion: String,
  librosSeleccionados: Array
}, { timestamps: true });

export default models.Pedido || model('Pedido', schemaPedido);
