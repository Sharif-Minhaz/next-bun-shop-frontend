/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "randomuser.me",
			},
			{
				protocol: "https",
				hostname: "files.edgestore.dev",
			},
		],
	},
};

export default nextConfig;
