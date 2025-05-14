import * as z from 'zod';

const envModel = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PUBLIC_API_BASE_URL: z.string({ required_error: 'Empty PUBLIC_API_BASE_URL' }),
  PUBLIC_BASE_PATH: z.string(),
});

export const env = envModel.parse({
  NODE_ENV: process.env.NODE_ENV,
  PUBLIC_API_BASE_URL: process.env.PUBLIC_API_BASE_URL,
  PUBLIC_BASE_PATH: process.env.PUBLIC_BASE_PATH,
});
