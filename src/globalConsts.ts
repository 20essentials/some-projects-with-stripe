export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://some-projects-with-stripe.vercel.app'
    : 'http://localhost:3000';
// export const BASE_URL = 'https://some-projects-with-stripe.vercel.app'
