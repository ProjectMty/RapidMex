import { getPool, sql } from '@/Modelo/sql/mssql';
import { NextResponse } from 'next/server';

export default async function GET(req: Request) {
    try {
        const pool = await getPool();
        const body = await req.json();
        const {token, id} = body;

            if (!token) {
      return NextResponse.json(
        { error: "token necesario" },
        { status: 400 }
      );
    }
 
    const inserted = await pool.request()
    .input('Token', sql.NVarChar(255), token)
    .input('id', sql.Int, id)
    .execute("SP_VerificarEmail");


    } catch (error) {
       return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    }
  
}