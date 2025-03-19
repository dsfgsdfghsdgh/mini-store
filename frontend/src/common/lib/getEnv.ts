export const getEnv = (value: string, defaultValue?: string) => {
  const env = process.env[value] || defaultValue;
  if (!env) {
    throw new Error(`Key ${value} not found in environment variables`);
  }
  return env;
};

export const STRIPE_PUBLIC_KEY = getEnv("VITE_STRIPE_PUBLIC_KEY");
