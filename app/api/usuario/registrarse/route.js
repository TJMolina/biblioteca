import { validarEsquema } from "@/app/middlewares/validator.middleware.js";
import { schemaRegistrarUsuario } from "@/app/schemas/usuarios.schema.js";
import { register } from "@/app/controllers/usuarios.controller";
import { conectDB } from "@/app/db";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        await conectDB();
        const reqq = await req.json();
        const res = await validarEsquema(schemaRegistrarUsuario, reqq, register);
        if (res.lentgh > 1) return NextResponse.json(...res);//tirar error si recibio error
        const response = NextResponse.json(...res,);

        response.cookies.set({
            name: "token",
            value: res.token,
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