/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost:8000','127.0.0.1']
    },
};

export default nextConfig;