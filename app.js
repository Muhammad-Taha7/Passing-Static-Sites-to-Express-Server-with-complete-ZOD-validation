import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { z } from 'zod';


const envSchema = z.object({
    Port: z.coerce.number().int().positive().default(3000),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error('Invalid environment variables:', env.error.flatten());
    process.exit(1);
}

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(env.data.Port, () => {
    console.log(`Server is running on port ${env.data.Port}`);
});