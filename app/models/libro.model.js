import {Schema, model, models } from "mongoose";

const schemaLibro = new Schema({
  img: String,
  title: String,
  autor: String,
  estante: String,
  description: String,
  asignatura: String,
  editorial: String,
  fechaIngreso: Date,
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  paginas: Number,
  porqueIngreso: {
    type: String,
    enum: ["can", "permuta", "com"],
  },
  estado: String,
  tejuelo: {
    dewi: String,
    tresPrimerasLetrasAutor: String,
    catalogacion: String,
  },
  stock: Number,
  pedidos: {
    type: Number,
    default: 0
  },
  disponible: {
    type: Number,
    default: function(){
      return this.stock - this.pedidos;
    },
  },
}, { timestamps: true });
const Libro = models.Libro || model('Libro', schemaLibro);
export default Libro;
