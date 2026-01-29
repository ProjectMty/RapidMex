import sql from 'mssql';

const config = {
  server: process.env.DB_SERVER!,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};



let pool: any;
export const getPool = async () => {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
};

export { sql };