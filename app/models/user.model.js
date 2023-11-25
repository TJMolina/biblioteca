import {Schema, model, models } from "mongoose";
//Reglas que deben tener los documentos (registros) del esquema (schema) usuario.
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});
export default models.User || model('User', userSchema);