
import query from '../../db/index.js';
const listAll = async(req,res)=>{

    /* `const dbRes = await db.query ('SELECT * FROM users')` is executing a SQL query to select all
    columns and rows from the "users" table in the PostgreSQL database. The `await` keyword is used
    to wait for the query to finish executing before assigning the result to the `dbRes` variable.
    The result is then returned as a JSON object in the response to the client. */
    const dbRes = await query ("SELECT email,username, created_at  FROM users");

    /* `const serverRes` is creating a new object with two properties: `message` and `data`. The
    `message` property is a string that indicates that the data for users has been found. The `data`
    property is assigned the value of `dbRes.rows`, which is an array of objects containing the data
    for each row returned by the SQL query. This object is then used as the response to the client
    when they make a GET request to the "/api/users" URL. */
    // database rows
    // const serverRes ={
    //     message:'Users data is found',
    //     data:dbRes.rows,
    // };

  

   /* `const serverRes` is creating a new object with two properties: `message` and `data`. The
   `message` property is a string that indicates the number of users found in the database by using
   the `rowCount` property of the `dbRes` object. The `data` property is assigned the value of
   `dbRes.rows`, which is an array of objects containing the data for each row returned by the SQL
   query. This object is then used as the response to the client when they make a GET request to the
   "/api/users" URL. */
    const serverRes ={
        message:`${dbRes.rowCount} users are found`,
        data: dbRes.rows,
    };

res.status(200).json(serverRes);
};

export default listAll;