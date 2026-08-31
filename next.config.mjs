import { createMDX } from 'fumadocs-mdx/next';

const config = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: '/docs/:path*.md', destination: '/llms.mdx/docs/:path*' }];
  },
};

export default createMDX()(config);