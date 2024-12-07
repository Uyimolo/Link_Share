/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if the site does not use HTTPS
        hostname: "firebasestorage.googleapis.com", // Replace with the external hostname
      },
    ],
  },
};

export default nextConfig;
