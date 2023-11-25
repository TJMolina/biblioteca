import { z } from "zod";

export const schemaCrearLibro = z.object({
  img: z.string("La imagen es necesaria").min(1, { message: "Se necesita una imagen"}),
  title: z.string("El titulo debe ser un texto").min(1, { message: "El título es requerido"}),
  autor: z.string("El autor debe ser un texto").min(1, { message: "El autor es requerido"}),
  estante: z.string("El estante debe ser un texto").min(1, { message: "El estante es requerido"}),
  description: z.string("La description debe ser un texto").min(1, { message: "La descripción es requerida"}),
  asignatura: z.string("La  asignatura debe ser un texto").min(1, { message: "La asignatura es requerida"}),
  editorial: z.string("La editorial debe ser un texto").min(1, { message: "La editorial es requerida"}),
  fechaIngreso: z.string().datetime("La fecha de ingreso es requerida"),
  fechaCreacion: z.string().datetime("La fecha de creacion es requerida"),
  paginas: z.number("Las paginas debe ser un numero").positive("El número de páginas debe ser positivo"),
  porqueIngreso: z.enum(["can", "permuta", "com"], "El motivo de ingreso es inválido"),
  estado: z.string("El estado debe ser un texto").min(1, { message: "El estado es requerido"}),
  tejuelo: z.object({
    dewi: z.string("El dewi debe ser un texto").min(1, { message: "El campo 'dewi' del tejuelo es requerido"}),
    tresPrimerasLetrasAutor: z.string("El tresPrimerasLetrasAutor debe ser un texto").min(1, { message: "El campo 'tresPrimerasLetrasAutor' del tejuelo es requerido"}),
    catalogacion: z.string("La catalogacion debe ser un texto").min(1, { message: "El campo 'catalogacion' del tejuelo es requerido"}),
  }),
  stock: z.number("El stock es necesario.").nonnegative('No deb ser un numero negativo.'),
}).refine((value) => Object.keys(value).length > 0, {
  message: "El objeto libro es requerido",
});


