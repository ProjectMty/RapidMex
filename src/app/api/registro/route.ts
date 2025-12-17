import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

export async function GET() {
  const hash = await bcrypt.hash("123456", 10);

  return new Response(
    JSON.stringify({
      password: "123456",
      hash: hash,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

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

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const token = Math.random().toString(36).substring(2);

    const inserted = await pool.request()
      .input('var_Usuario', sql.NVarChar(20), usuario)
      .input('var_Contrasena', sql.NVarChar(255), hashedPassword)
      .input('var_Correo', sql.NVarChar(20), correo)
      .input('var_token', sql.NVarChar(255), token)
      .input('var_Nombre', sql.VarChar(20), nombre)
      .input('var_APaterno', sql.VarChar(20), apaterno)
      .input('var_AMaterno', sql.VarChar(20), amaterno)
      .input('var_Telefono', sql.VarChar(20), telefono)
      .input('var_Empresa', sql.VarChar(20), empresa)
      .execute("SP_CrearDatosP");

    const verificationUrl = `http://localhost:3000/api/verify?token=${token}`;

    const emailOptions = {
      from: 'tu_correo@dominio.com',
      to: correo,
      subject: 'Verificación de correo electrónico',
      html: `<p>Haz clic en el siguiente enlace para verificar tu correo: <a href="${verificationUrl}">Verificar Correo</a></p>`,
    };

    // Enviar el correo a través de Resend
    await resend.sendEmail(emailOptions);
  
    return NextResponse.json(inserted.recordset[0], { status: 201 });
  } catch (error) {
    console.error('DB error', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );

  }
}