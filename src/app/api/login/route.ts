import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const pool = await getPool();
        const body = await req.json();

        const { contrasena, correo } = body;
        console.log("body para db", body)
        if (!contrasena || !correo) {
            return NextResponse.json(
                { error: "Campos vacios" },
                { status: 400 }
            );
        }

        const inserted = await pool.request()
            .input('var_Contrasena', sql.NVarChar(20), contrasena)
            .input('var_Correo', sql.NVarChar(50), correo)
            .output('id', sql.Int)
            .execute("SP_IniciarSesion");

        const idUsuario = inserted.output.id;

        return NextResponse.json({ id: idUsuario }, { status: 200 });
    } catch (error) {
        console.error('DB error', error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );

    }
}