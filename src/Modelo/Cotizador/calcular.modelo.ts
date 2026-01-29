import type { NextApiRequest, NextApiResponse } from "next";
import { getPool } from "../sql/mssql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pool = await getPool();
    const result = await pool.request()
      // Ajusta la consulta a tu esquema
      .query('SELECT TOP (10) * FROM Usuarios');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('DB error', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
}

