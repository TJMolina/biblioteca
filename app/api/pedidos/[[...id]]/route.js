import { crearPedido, deletePedido, getPedidos } from "@/app/controllers/pedidos.controller";
import { conectDB } from "@/app/db";
import { validarEsquema } from "@/app/middlewares/validator.middleware";
import { schemaRealizarPedido } from "@/app/schemas/pedidos.schema";
import { NextResponse } from "next/server";
//sube pedido
export async function POST(req) {
    try {
        await conectDB();
        const reqq = await req.json();
        const respuesta = await validarEsquema(schemaRealizarPedido, reqq, crearPedido)
        return NextResponse.json(...respuesta);

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

//obtiene todos los pedidos
export async function GET(req, {params}) {
    try {
        await conectDB();

        //borra un pedido
        if(params.id){
            const respuesta = await deletePedido(params.id[0]);
            return NextResponse.json(...respuesta);
        }

        const respuesta = await getPedidos();
        return NextResponse.json(...respuesta);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

