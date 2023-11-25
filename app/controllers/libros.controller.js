import Libro from '../models/libro.model.js';
export const getLibros = async (req, res) => {
    const Libros = await Libro.find();//mostrar en user todo a lo que este hace referencia
    return [Libros];
};

// ---------------------------------------------

export const crearLibro = async (req) => {
    try {
        //obtener estos datos del body de la consulta del que consume esta api
        const {
            img,
            title,
            autor,
            estante,
            description,
            asignatura,
            editorial,
            fechaIngreso,
            fechaCreacion,
            paginas,
            porqueIngreso,
            estado,
            tejuelo,
            stock,
            pedidos
        } = req;
        const newLibro = new Libro({
            img,
            title,
            autor,
            estante,
            description,
            asignatura,
            editorial,
            fechaIngreso,
            fechaCreacion,
            paginas,
            porqueIngreso,
            estado,
            tejuelo,
            stock,
            pedidos
        });
        await newLibro.save();
        const savedLibro = await newLibro.save();
        return [{message: savedLibro}, {status: 200}];
    } catch (error) {
        console.log(error);
        return [{ message: 'Algo salio mal.', status: 500 }];
    }
};

// ---------------------------------------------
//obtener solo 1 libro
export const getLibro = async (id) => {
    try {
        const libro = await Libro.findById(id);//user es un parametro dentro del documento libro. quiero que muestre los datos de aquel al que hace referencia
        if (!libro) return [{ error: 'Libro no encontrado.' }, { status: 404 }];
        return [libro];
    } catch {
        return [{ error: 'Libro no encontrado.' }, { status: 404 }];
    }
};

// ---------------------------------------------

export const borrarLibro = async (id) => {
    try {
        const libro = await Libro.findByIdAndDelete(id);
        if (!libro) return [{ message: 'Libro no encontrado.' }, {status: 404}];
        return [{message: "Realizado."}, {status: 200}];
    } catch {
        return [{ error: 'Libro no encontrado.' }, {status: 404}];
    }
};

// ---------------------------------------------

export const actualizarLibro = async (req, id) => {
    try {
        const libro = await Libro.findByIdAndUpdate(id,req, { new: true });
        if (!libro) return [{ error: 'Libro no encontrado.' }, {status: 404}];
        return [libro];
    } catch {
        return [{ error: 'Libro no encontrado.' }, {status: 404}];
    }
};