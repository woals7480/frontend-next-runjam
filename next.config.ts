import type { NextConfig } from "next";

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "openweathermap.org" }],
  },
};

export default withVanillaExtract(nextConfig);
