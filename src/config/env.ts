export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
} as const;

// Type checking for required environment variables
(() => {
  const requiredEnvs = ['NEXT_PUBLIC_API_BASE_URL'] as const;
  for (const key of requiredEnvs) {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is required`);
    }
  }
})(); 