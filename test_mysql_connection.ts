import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kry,pton.0749',
  database: 'signupdb',
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database!');
    
    // Example query
    const [rows, fields] = await connection.query('SELECT 1 + 1 AS solution');
    console.log('Query result:', rows);
    
    connection.release();
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
}

testConnection();

