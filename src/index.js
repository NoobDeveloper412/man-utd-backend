import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js';
import threadRoutes from './routes/threadsRoutes.js';
import teamsRoutes from './routes/teamsRoutes.js';
import fixturesRoutes from './routes/fixturesRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import merchRoutes from './routes/admin/merchRoutes.js';
import merchRoutesCrud from './routes/admin/merchRoutesCrud.js';
import cors from "cors"
import multer from 'multer';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// Using Mutler
const upload = multer({ dest: 'uploads/' });

// Supabase client
global.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Routes
app.use('/api', authRoutes);
app.use('/api', threadRoutes);
app.use('/api', fixturesRoutes);
app.use('/api', teamsRoutes);
app.use('/api', newsRoutes);

// Admin Routes
app.use('/api/admin/merch', upload.single('image'), merchRoutes);
app.use('/api/merch', merchRoutesCrud);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server blasting off at http://localhost:${PORT}`));
