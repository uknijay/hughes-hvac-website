/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoBasePath = '/hughes-hvac-website';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubPages ? repoBasePath : undefined,
  assetPrefix: isGithubPages ? `${repoBasePath}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  }
};

export default nextConfig;
