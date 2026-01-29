import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
  try {

    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const id = url.searchParams.get("id");

    if (!token || !id) {
      return NextResponse.json(
        { status: 'error', message: 'Faltan parámetros necesarios (token o id)' },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const result = await pool.request()
      .input('Token', sql.NVarChar(255), token)
      .input('id', sql.Int, id)
      .execute("SP_VerificarEmail");

    if (result.recordset.length > 0) {
      return NextResponse.json(
        { status: 'success', message: result.recordset[0].Message },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { status: 'error', message: 'Respuesta inesperada del servidor' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Error en la verificación'
      },
      { status: 400 }
    );
  }

}