/** @type {import('next').NextConfig} */

const nextConfig = {
  async apiRoutes() {
    return {
      "/api/auth/login": "postLogin",
      "/api/auth/register": "postRegister",
    };
  },
};

export default nextConfig;
