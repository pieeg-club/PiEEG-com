import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const projectDir = fs.existsSync(path.join(cwd, "node_modules", "tailwindcss"))
  ? cwd
  : fs.existsSync(path.join(cwd, "pieeg-com", "node_modules", "tailwindcss"))
    ? path.join(cwd, "pieeg-com")
    : cwd;

const nodeModulesDir = path.join(projectDir, "node_modules");
const existingNodePath = process.env.NODE_PATH
  ? process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
  : [];

if (!existingNodePath.includes(nodeModulesDir)) {
  process.env.NODE_PATH = [nodeModulesDir, ...existingNodePath].join(path.delimiter);
}

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: path.join(projectDir, "src"),
    },
  },
};

export default config;

