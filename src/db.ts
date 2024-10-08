import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const signupDbPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_SIGNUP,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const reviewDbPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_REVIEW, // Ensure this is the correct DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});



const dashboardDbPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_DASHBOARD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const coursesDbPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_COURSES,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connections
const testConnection = async () => {
  try {
    const connection = await signupDbPool.getConnection();
    console.log('Connected to the signup database.');
    connection.release();

    const reviewConnection = await reviewDbPool.getConnection();
    console.log('Connected to the review database.');
    reviewConnection.release();

    const dashboardConnection = await dashboardDbPool.getConnection();
    console.log('Connected to the dashboard database.');
    dashboardConnection.release();

    const coursesConnection = await coursesDbPool.getConnection();
    console.log('Connected to the courses database.');
    coursesConnection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

testConnection();

export { signupDbPool, reviewDbPool, dashboardDbPool, coursesDbPool };
