// src/types.d.ts
declare module '../db' {
  import { Pool } from 'mysql';
  const pool: Pool;
  export default pool;
}
