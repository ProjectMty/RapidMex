import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EmailTemplate from '@/Vista/email/emailVerificacion';


export async function POST(req: Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY as string);
        const pool = await getPool();
        const body = await req.json();
        const { id } = body

        if (!id) {
            return NextResponse.json(
                { status: 'error', message: 'Faltan parámetros necesarios (id)' },
                { status: 400 }
            );
        }

        const token = Math.random().toString(36).substring(2);
        // 10 minutos de vigencia en token
        const tokenExpira = new Date(Date.now() + 10 * 60 * 1000);

        const create = await pool.request()
            .input('var_id', sql.Int, id)
            .input('var_token', sql.NVarChar(255), token)
            .input('var_expira', sql.DateTime, tokenExpira)
            .output('var_correo', sql.NVarChar(50))
            .execute("SP_CrearToken")

        const correo = create.output.var_correo

        const verificationUrl = `http://localhost:3000/verificacion?token=${token}&id=${id}`;

        await resend.emails.send({
            from: 'RapidMex <no-reply@rapidmex.com>',
            to: correo,
            subject: `Verificación de cuenta RapidMex`,
            react: EmailTemplate({ url: verificationUrl }),
        });

    if (create.recordset.length > 0) {
       return NextResponse.json(
        { status: 'success', message: 'Token creado' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: 'error', message: 'No se pudo crear un nuevo token' },
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