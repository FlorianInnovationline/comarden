/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Supabase Storage public buckets (product-images, event-media, etc.)
      // Pattern: https://<project-ref>.supabase.co/storage/v1/object/public/<bucket>/<path>
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/produits/epdm',
        destination: '/produits/toitures-plates',
        permanent: true,
      },
      {
        // SEO-friendly URL for the asbestos-replacement info page.
        source: '/toiture-amiante-remplacement',
        destination: '/marques/danger-amiante',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/services',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
          { key: 'CDN-Cache-Control', value: 'no-store' },
          { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
          { key: 'Surrogate-Control', value: 'no-store' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
      {
        source: '/actu',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
          { key: 'CDN-Cache-Control', value: 'no-store' },
          { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
          { key: 'Surrogate-Control', value: 'no-store' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
