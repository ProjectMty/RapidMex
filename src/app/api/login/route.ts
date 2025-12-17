import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from '@/Modelo/Cotizador/env';
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const pool = await getPool();
        const body = await req.json();

        const { contrasena, correo } = body;

        if (!contrasena || !correo) {
            return NextResponse.json(
                { error: "Campos vacios" },
                { status: 400 }
            );
        }

        const result = await pool.request()
            .input('var_Correo', sql.NVarChar(50), correo)
            .execute("SP_IniciarSesion");

        const user = result.recordset[0];
        console.log("Usuario DB:", user);
        if (!user) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }


        const isValid = await bcrypt.compare(
            contrasena,
            user.Contrasena
        );

        if (!isValid) {
            return NextResponse.json(
                { error: "Credenciales inválidas 2" },
                { status: 401 }
            );
        }
        console.log("Password válida:", isValid);
        
        const token = jwt.sign(
            { id: user.IdCliente },
            JWT_SECRET,
            { expiresIn: "1d" }
        );
        const response = NextResponse.json({
            message: "Login exitoso"
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24
        });


        return response

    } catch (error) {
        console.error('DB error', error);
        return NextResponse.json(
            { error: "Error interno " },
            { status: 500 }
        );

    }
}