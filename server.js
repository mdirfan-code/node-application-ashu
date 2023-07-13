// Import dependencies
const express = require('express');
const sql = require('mssql');

// Create an instance of the Express server
const app = express();

// Azure SQL Database configuration
const config = {
  server: 'xyz-db-server.database.windows.net',
  database: 'xyz-database',
  user: 'xyz-db-server-user',
  password: 'Ashu@1234',
  options: {
    encrypt: true // Use encryption
  }
};

// API route to create a table
app.get('/createTable', async (req, res) => {
  try {
    // Connect to the Azure SQL Database
    await sql.connect(config);

    // Create a new table
    const result = await sql.query(`
      CREATE TABLE TestTable (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(50),
        Age INT
      )
    `);
    console.log("Table created successfully!")

    res.send('Table created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating table.');
  }
});

// API route to execute a query
app.get('/executeQuery', async (req, res) => {
  try {
    // Connect to the Azure SQL Database
    await sql.connect(config);

    // Execute a sample query
    const result = await sql.query('SELECT * FROM TestTable');
    console.log(result.recordset);

    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error executing query.');
  }
});

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
