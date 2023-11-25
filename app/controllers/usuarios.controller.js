import { createTokenDeAcceso } from "../libs/jwt.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
// ------------------------------------------------------

export const register = async (req) => {
    //Proceso de crear usuario
    try {
        //obtener estos datos enviados del body del usuario que consume esta api
        const { email, password, username } = req;
        //buscar uno que ya exista
        const userFound = await User.findOne({ email });
        if (userFound) return [{ error: "El correo esta en uso." }, { status: 400 }];

        //encriptar la contraseña
        const hash = await bcrypt.hash(password, 10);
        //creo un nuevo documento de mongodb
        const newUser = new User({
            username,
            email,
            password: hash
        });
        //subo el documento
        const userSaved = await newUser.save();

        //generar un token para facilitar el login
        const token = await createTokenDeAcceso({ id: userSaved._id });
        return [token];

    } catch (error) {
        return [{ error: error.message }, { status: 400 }];
    }
};

// ---------------------------------------------------

export const login = async (req) => {
    const { email, password } = req;
    try {
        //buscar usuario
        const userFound = await User.findOne({ email });
        if (!userFound) return [{ error: "No se encontro el usuaio." }, { status: 400 }];

        //coincidir contraseña
        const coincide = await bcrypt.compare(password, userFound.password);
        if (!coincide) return [{ error: "Contraseña incorrecta." }, { status: 400 }];

        //crear token
        const token = await createTokenDeAcceso({ id: userFound._id });
        return [{
            token: token,
            username: userFound.username,
            email: userFound.email
        }];
    } catch (error) {
        return [{ error: error.message }, { status: 400 }];
    }
};

// ------------------------------------------------
//Verificar que el usuario tenga un token, osea que este logueado, y que este token sea valido y correspondiente a un id de usuario existente
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: 'Unauthorized' });
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}