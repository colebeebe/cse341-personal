import express from 'express';

import { connectDB } from './models/db.js';
import cors from './middleware/cors.js';
import router from './routes/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors);

app.use('/', router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening at http://localhost:${PORT}`);
});
