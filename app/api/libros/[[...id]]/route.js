import { NextResponse } from "next/server";
import { conectDB } from "@/app/db";
import { getLibro, getLibros, crearLibro, actualizarLibro, borrarLibro } from "@/app/controllers/libros.controller";
import { validarEsquema } from "@/app/middlewares/validator.middleware";
import { schemaCrearLibro } from "@/app/schemas/libros.schema";
export async function GET(req, { params }) {
    try {
        await conectDB();
        if (params.id) {//buscar solo un libro
            const libro = await getLibro(params.id[0]);
            return NextResponse.json(...libro);
        }
        else {//buscar todos los libros
            const libros = await getLibros();
            return NextResponse.json(...libros);
        }

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(req, {params}) {
    try {
        await conectDB();
        if (params.id) {//buscar solo un libro
            const respuesta = await borrarLibro(params.id[0]);
            return NextResponse.json(...respuesta);

        }else{
            const reqq = await req.json();
            const respuesta = await validarEsquema(schemaCrearLibro, reqq, crearLibro)
            return NextResponse.json(...respuesta);
        }


    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        if (!params.id) return NextResponse.json({ error: "Se requiere id." }, { status: "400" });
        await conectDB();
        const respuesta = await actualizarLibro(req, params.id[0]);
        return NextResponse.json(...respuesta);


    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}