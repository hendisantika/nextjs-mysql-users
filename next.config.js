/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };
//
// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root', // @@@
      database: 'users'
    },
    secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'http://localhost:3000/api' // production api
  }
}

module.exports = nextConfig
