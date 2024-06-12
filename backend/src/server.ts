import express from 'express';
import * as http from 'http';
import dataRoutes from './routes/dataRoutes';
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// CORS'u etkinleştirin
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/data', dataRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
