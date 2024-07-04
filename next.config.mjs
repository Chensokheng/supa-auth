import nextra from "nextra";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "avatars.githubusercontent.com",
				protocol: "https",
			},
		],
	},
};

const withNextra = nextra({
	theme: "nextra-theme-docs",
	themeConfig: "./theme.config.jsx",
});

export default withNextra(nextConfig);
