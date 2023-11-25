import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
//consulta, respuesta, hay otra funcion despues
export const validarUsuario = (req, res, next) => {
    //obtener el token dentro de las cookies del usuario
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Sin token, no hay autorizacion.' })
    Jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) res.status(403).json({ message: 'No hay un token valido.' })
        //si todo salio bien, crear la propiedad usuario dentro de la consulta e insertar el dato desencriptado del token del usuario.
        req.user = user;
        next();
    })
}