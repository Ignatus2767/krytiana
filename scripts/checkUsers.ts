import pool from '../src/db';

const checkUsers = async () => {
  try {
    const [results] = await pool.query('SELECT * FROM users');
    console.log('Users:', results);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

checkUsers();
