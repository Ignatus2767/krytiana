import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes'; // Import the review routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Mount user routes under /api/users
app.use('/api/users', userRoutes);

// Mount review routes under /api/reviews
app.use('/api/reviews', reviewRoutes); // This mounts your review routes

// Define other routes as needed
app.get('/example', (req, res) => {
  res.send('This is an example route.');
});

// Handle 404 - Page Not Found
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
