import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import { Resend } from 'resend';
import EmailTemplate from '@/Vista/email/emailVerificacion';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY as string);
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

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const token = Math.random().toString(36).substring(2);
    // 10 minutos de vigencia en token
    const tokenExpira = new Date(Date.now() + 10 * 60 * 1000);

    const inserted = await pool.request()
      .input('var_Usuario', sql.NVarChar(20), usuario)
      .input('var_Contrasena', sql.NVarChar(255), hashedPassword)
      .input('var_Correo', sql.NVarChar(20), correo)
      .input('var_token', sql.NVarChar(255), token)
      .input('var_expira', sql.DateTime, tokenExpira)
      .input('var_Nombre', sql.VarChar(20), nombre)
      .input('var_APaterno', sql.VarChar(20), apaterno)
      .input('var_AMaterno', sql.VarChar(20), amaterno)
      .input('var_Telefono', sql.VarChar(20), telefono)
      .input('var_Empresa', sql.VarChar(20), empresa)
      .output('id_credencial', sql.Int)
      .execute("SP_CrearDatosP");

    const idCredencial = inserted.output.id_credencial;

    const verificationUrl = `http://localhost:3000/verificacion?token=${token}&id=${idCredencial}`;

    await resend.emails.send({
      from: 'RapidMex <no-reply@rapidmex.com>',
      to: correo,
      subject: `Verificación de cuenta RapidMex`,
      react: EmailTemplate({ url: verificationUrl }),
    });


    return NextResponse.json(inserted.recordset[0], { status: 201 });
  } catch (error) {
    console.error('DB error', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );

  }
}