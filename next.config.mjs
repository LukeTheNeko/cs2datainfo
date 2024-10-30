/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.cs2data.info',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;  