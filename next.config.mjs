/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
        console.log(backend_url);
        return [
            {
                source : `/public/storage/storage/:path*`,
                destination : `http://127.0.0.1:8000/public/storage/storage/:path*`
            }
        ]
    }
};

export default nextConfig


