import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const signupDbPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_SIGNUP,
  port: process.env.DB_PORT
});

const reviewDbPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_REVIEW,
});

// Test database connections
const testConnection = async () => {
  try {
    // Test signup database connection
    const connection = await signupDbPool.getConnection();
    console.log('Connected to the signup database.');
    connection.release();

    // Test review database connection
    const reviewConnection = await reviewDbPool.getConnection();
    console.log('Connected to the review database.');
    reviewConnection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

testConnection();

export { signupDbPool, reviewDbPool };
