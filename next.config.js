/** @type {import('next').NextConfig} */ const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/cafe-24-2286c.appspot.com/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
