/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'media.api-sports.io',
      'api.fifa.com'
    ],
  },
}

module.exports = nextConfig