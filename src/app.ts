import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import clienteRoutes from './routes/clienteRoutes';
import cors from 'cors';

const app = express();

app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/clientes', clienteRoutes)

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:4200']
}));

export default app
