// myapp/src/app.ts

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';
import coursesRoutes from './routes/coursesRoute';
import profileRoute from './routes/profileRoute'; 
import todoRoutes from './routes/todoRoutes';
import { refreshToken } from './middlewares/authMiddleware';
import cors from 'cors';

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/refresh-token', refreshToken);

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/user', profileRoute);
app.use('/api', todoRoutes); 

app.get('/', (req, res) => {
  res.render('index');
});

export default app;
