import { validarUsuario } from "@/app/middlewares/validateToken.js";
import { validarEsquema } from "@/app/middlewares/validator.middleware.js";
import { schemaLoginUsuario } from "@/app/schemas/usuarios.schema.js";
import { login } from "@/app/controllers/usuarios.controller";
import { conectDB } from "@/app/db";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await conectDB();
        const reqq = await req.json();
        const res = await validarEsquema(schemaLoginUsuario, reqq, login);

        if (res[0].error) return NextResponse.json(...res);//tirar error si recibio error
        const response = NextResponse.json(...res,);

        response.cookies.set({
            name: "token",
            value: res[0],
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
        });
        return response;
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({error: e}, {status: 500});
    }
}