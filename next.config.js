const withYaml = require("next-plugin-yaml");

/** @type {import('next').NextConfig} */
const nextConfig = withYaml({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
