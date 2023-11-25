import Pedido from "../models/pedido.model.js"
// ------------------------------------------------------

export const crearPedido = async (req, res) => {
    //obtener estos datos enviados del body del usuario que consume esta api
    const { profesor, solicitante, especialidad, year, divicion, librosSeleccionados } = req;
    //Proceso de crear pedido
    try {

        //creo un nuevo documento de mongodb
        const newPedido = new Pedido({
            profesor, 
            solicitante, 
            especialidad, 
            year, 
            divicion, 
            librosSeleccionados
        });

        //subo el documento
        const pedidoSaved = await newPedido.save();

        return [{
            message: 'Pedido creado exitosamente.',
            data: pedidoSaved
        }];

    } catch (error) {
        return [{ error: error.message }, { status: 400 }];
    }
};


export async function getPedidos() {
    try {
        const pedidos = await Pedido.find();
        return [pedidos];
    }
    catch (error) {
        return [{ error: error.message }, { status: 400 }];

    }
}


export const deletePedido = async (id) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(id);
        if (!pedido) return [{ message: 'Pedido no encontrado.' }, {status: 404}];
        return [{message: "Realizado."}, {status: 200}];
    } catch {
        return [{ error: 'Pedido no encontrado.' }, {status: 404}];
    }
};