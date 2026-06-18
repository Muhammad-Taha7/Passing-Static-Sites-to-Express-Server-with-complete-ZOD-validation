import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.flatten());
  process.exit(1);
}

const app = express();

// ✅ Serve static files
app.use(express.static("index.html","Style.css"));

// optional route (not required)
app.get('/api', (req, res) => {
  res.json({ message: "API working fine 🚀" });
});

app.listen(env.data.PORT, () => {
  console.log(`Server is running on port ${env.data.PORT}`);
});