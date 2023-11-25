//para comporobar que lo recibido cumpla con las condiciones de cierto esquema
export const validarEsquema = async (schema, req, next) => {
    try {
        //ejecuta el schema para verificar que las condiciones se cumplan, por ejemplo que solo mande enteros
        schema.parse(req);
        const res = await next(req);

        return res;
    } catch (error) {
        console.log(error)
        return [{ error: error.errors.map(err => err)}, {status: 400}];
    }
}