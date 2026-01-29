import { NextResponse } from "next/server";
import sql, { NVarChar } from "mssql";
import { getPool } from "@/Modelo/sql/mssql";
import bcrypt from "bcryptjs";
import { Resend } from 'resend';
import EmailTemplate from "@/Vista/email/emailCambioContra";

export async function POST(req: Request) {
    try {
        const pool = await getPool();

        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");
        const body = await req.json();

        switch (action) {
            case "contraseña":
                return await cambiarcontraseña(pool, body);

            case "envioCorreo":
                return await enviarCorreo(pool, body);

            default:
                return NextResponse.json(
                    { error: "Acción no válida" },
                    { status: 400 }
                );
        }

    } catch (error) {
        console.error("DB error", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

async function cambiarcontraseña(
    pool: sql.ConnectionPool,
    body: any
) {
    const { id, pass, token } = body;

    if (!id || !pass || !token) {
        return NextResponse.json(
            { error: "Campos faltantes faltantes" },
            { status: 400 }
        );
    }
    const hashedPassword = await bcrypt.hash(pass, 10);

    const result = await pool.request()
        .input("var_id", sql.Int, id)
        .input("var_pass", sql.NVarChar(255), hashedPassword)
        .input("var_token", sql.NVarChar(255), token)
        .execute("SP_CambioContrasena");

   return NextResponse.json(
        {
            success: true,
            ubicacion: result.output
        },
        { status: 200 }
    );
}

async function enviarCorreo(
    pool: sql.ConnectionPool,
    body: any
) {

    try {
        const resend = new Resend(process.env.RESEND_API_KEY as string);
        const { correo } = body;
        if (!correo) {
            return NextResponse.json(
                { error: "correo faltante" },
                { status: 400 }
            );
        }

        const token = Math.random().toString(36).substring(2);
        // 10 minutos de vigencia en token
        const tokenExpira = new Date(Date.now() + 10 * 60 * 1000);


        const result = await pool.request()
            .input("var_correo", sql.NVarChar(50), correo)
            .input("var_token", sql.NVarChar(255), token)
            .input("var_expira", sql.DateTime, tokenExpira)
            .output('var_id', sql.Int)
            .execute("SP_TokenCambioContra");

        const id = result.output.var_id

        const verificacionUrl = `http://localhost:3000/contra?token=${token}&id=${id}`;

        await resend.emails.send({
            from: 'RapidMex <no-reply@rapidmex.com>',
            to: correo,
            subject: `Cambio de Contraseña RapidMex`,
            react: EmailTemplate({ url: verificacionUrl }),
        });

        if (result.recordset.length > 0) {
            return NextResponse.json(
                { status: 'success', message: 'Email enviado' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { status: 'error', message: 'No se pudo enviar correo, intentelo mas tarde' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('DB error', error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );

    }

}