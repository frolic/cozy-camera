import alchemy from "alchemy";
import { Website } from "alchemy/cloudflare";

const app = await alchemy("cozy-camera");

const site = await Website("cozy-camera", {
  name: "cozy-camera",
  build: "pnpm run build",
  dev: "pnpm run dev",
  assets: "./dist",
  domains: ["cozy.camera"],
});
