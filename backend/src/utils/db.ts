import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "frontend_assignment",
  password: "m1ghtyh4mster",
  port: 5432,
});

export default pool;
