import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const pool = await getPool();
        const body = await req.json();

        const { usuario, contrasena, correo, nombre, apaterno, amaterno, telefono, empresa } = body;
        console.log("body para db", body)
        if (!usuario || !nombre || !contrasena || !correo || !nombre || !apaterno || !amaterno || !telefono || !empresa) {
            return NextResponse.json(
                { error: "Campos vacios" },
                { status: 400 }
            );
        }

        const inserted = await pool.request()
            .input('var_Usuario', sql.NVarChar(20), usuario)
            .input('var_Contrasena', sql.NVarChar(20), contrasena)
            .input('var_Correo', sql.NVarChar(20), correo)
            .input('var_Nombre', sql.VarChar(20), nombre)
            .input('var_APaterno', sql.VarChar(20), apaterno)
            .input('var_AMaterno', sql.VarChar(20), amaterno)
            .input('var_Telefono', sql.VarChar(20), telefono)
            .input('var_Empresa', sql.VarChar(20), empresa)
            .execute("SP_CrearDatosP");

        return NextResponse.json(inserted.recordset[0], { status: 201 });
    } catch (error) {
        console.error('DB error', error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );

    }
}