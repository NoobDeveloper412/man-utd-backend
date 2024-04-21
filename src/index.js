import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js';
import threadRoutes from './routes/threadsRoutes.js';
import fixturesRoutes from './routes/fixturesRoutes.js';
import cors from "cors"

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// Supabase client
global.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Routes
app.use('/api', authRoutes);
app.use('/api', threadRoutes);
app.use('/api', fixturesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server blasting off at http://localhost:${PORT}`));
