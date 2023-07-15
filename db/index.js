import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";


const db = new Pool({
    host: process.env.DB_HOST ||'localhost',
    user: process.env.DB_USER ||'postgres',
    password: process.env.DB_PASSWORD || "Aina9495_",
    database:process.env.DB_DATABASE ||"my-blog",
    ssl: process.env.DB_SSL || "true",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

 /**
  * The function logs information about a query and returns the result of the query.
  * @param text - The SQL query to be executed.
  * @param params - params is a parameter that represents an array of values to be used as parameters
  * in a SQL query. These values are used to replace placeholders in the SQL query string. The purpose
  * of using parameters is to prevent SQL injection attacks and to make the code more secure.
  * @returns The function `query` is returning the result of the `db.query` function call, which is a
  * Promise that resolves to the result of the executed SQL query.
  */
  const query = async (text, params) => {
    const start = Date.now();
    const time = new Date();
    const res = await db.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", {
      text,
      start: time,
      duration,
      rows: res.rowCount,
    });
    return res;
  };
  
  export default query;