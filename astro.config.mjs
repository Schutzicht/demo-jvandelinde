import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://van-de-linde-demo.vercel.app",
  server: { port: 4368, host: true },
  vite: {
    plugins: [tailwindcss()],
  },
});
