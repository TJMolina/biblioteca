import { z } from 'zod';

export const schemaRealizarPedido = z.object({
  profesor: z.string({
    required_error: 'Se requiere saber quien lo solicita.',
  }),
  solicitante: z.string({
    required_error: 'Se requiere saber quien lo solicita.',
  }),
  librosSeleccionados: z.array(z.string()).min(1, {
    message: 'Se requieren libros',
  }),
});
